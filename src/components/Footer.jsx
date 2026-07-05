import ShareButtons from './ShareButtons.jsx'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>Deze pagina is opgezet door Arno Wals, zoon van Tom.</p>
        <div className="footer-links">
          <span>
            Vragen? Mail naar <a href="mailto:arnowals@icloud.com">arnowals@icloud.com</a>
          </span>
        </div>
        <ShareButtons />
      </div>
    </footer>
  )
}
