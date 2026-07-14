import fs from 'node:fs'
import path from 'node:path'

const PAGES_DIR = 'src/pages'
const GENERATED_DIR = 'generated'

function readPages(root) {
  const dir = path.resolve(root, PAGES_DIR)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.jsx') && !file.startsWith('_'))
    .map((file) => {
      const slug = file.replace(/\.jsx$/, '')
      const source = fs.readFileSync(path.join(dir, file), 'utf8')
      return { slug, entry: `/${PAGES_DIR}/${file}`, meta: readMeta(source, file) }
    })
}

function readMeta(source, file) {
  const start = source.indexOf('export const meta')
  if (start === -1) {
    throw new Error(`${file} exporteert geen \`meta\` (titel, description, og...)`)
  }

  const open = source.indexOf('{', start)
  let depth = 0
  let end = -1
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{') depth++
    if (source[i] === '}') {
      depth--
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }
  if (end === -1) throw new Error(`Kan \`meta\` in ${file} niet lezen`)

  try {
    // eslint-disable-next-line no-new-func
    return new Function(`return (${source.slice(open, end)})`)()
  } catch (err) {
    throw new Error(`\`meta\` in ${file} moet een gewone object-literal zijn: ${err.message}`)
  }
}

const escape = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

function renderHtml({ slug, entry, meta }) {
  const url = meta.url ?? `https://helptom.nl/${slug}.html`
  const tags = [
    ['og:title', meta.ogTitle ?? meta.title],
    ['og:description', meta.ogDescription ?? meta.description],
    ['og:type', meta.ogType ?? 'article'],
    ['og:url', url],
    ['og:image', meta.ogImage ?? 'https://helptom.nl/og-familiefoto.jpg'],
  ]

  return `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escape(meta.title)}</title>
    <meta name="description" content="${escape(meta.description)}" />

${tags.map(([p, c]) => `    <meta property="${p}" content="${escape(c)}" />`).join('\n')}

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${entry}"></script>
  </body>
</html>
`
}

export default function updatePages() {
  let root = process.cwd()
  let outDir = 'dist'

  const generate = () => {
    const pages = readPages(root)
    const dir = path.resolve(root, GENERATED_DIR)
    fs.mkdirSync(dir, { recursive: true })

    const wanted = new Set(pages.map((page) => `${page.slug}.html`))
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.html') && !wanted.has(file)) fs.rmSync(path.join(dir, file))
    }

    for (const page of pages) {
      const file = path.join(dir, `${page.slug}.html`)
      const html = renderHtml(page)
      if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== html) {
        fs.writeFileSync(file, html)
      }
    }
    return pages
  }

  return {
    name: 'help-tom-update-pages',

    config(userConfig) {
      root = path.resolve(userConfig.root ?? process.cwd())
      const pages = generate()

      const input = { main: path.resolve(root, 'index.html') }
      for (const page of pages) {
        input[page.slug] = path.resolve(root, GENERATED_DIR, `${page.slug}.html`)
      }
      return { build: { rollupOptions: { input } } }
    },

    configResolved(config) {
      outDir = config.build.outDir
    },

    closeBundle() {
      const dist = path.resolve(root, outDir)
      const dir = path.join(dist, GENERATED_DIR)
      if (!fs.existsSync(dir)) return

      for (const file of fs.readdirSync(dir)) {
        const html = fs
          .readFileSync(path.join(dir, file), 'utf8')
          .replace(/(["'(])\.\.\/assets\//g, '$1./assets/')
        fs.writeFileSync(path.join(dist, file), html)
      }
      fs.rmSync(dir, { recursive: true, force: true })
    },

    configureServer(server) {
      const watched = path.resolve(root, PAGES_DIR)
      server.watcher.add(watched)
      const onChange = (file) => {
        if (file.startsWith(watched) && file.endsWith('.jsx')) generate()
      }
      server.watcher.on('add', onChange)
      server.watcher.on('change', onChange)

      server.middlewares.use((req, res, next) => {
        const [pathname, query = ''] = (req.url ?? '').split('?')
        const slug = pathname.replace(/^\//, '').replace(/\.html$/, '')
        if (slug && fs.existsSync(path.resolve(root, GENERATED_DIR, `${slug}.html`))) {
          req.url = `/${GENERATED_DIR}/${slug}.html${query ? `?${query}` : ''}`
        }
        next()
      })
    },
  }
}
