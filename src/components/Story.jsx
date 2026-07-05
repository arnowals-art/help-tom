export default function Story() {
  return (
    <section id="verhaal">
      <div className="container">
        <div className="story-grid">
          <div>
            <span className="section-label">Zijn verhaal</span>
            <h2 className="section-title">Wie is Tom?</h2>
            <div className="prose">
              <p>
                Mijn vader Tom is 59. Hij staat altijd voor anderen klaar en
                vraagt zelden iets terug. Hij heeft vier kinderen, en sinds
                kort zijn eerste kleinkind. Daar geniet hij enorm van.
              </p>
              <p>
                In januari 2026 kregen we de diagnose: diffuse cutane
                systemische sclerose, oftewel sclerodermie. Een zeldzame
                auto-immuunziekte waarbij zijn afweersysteem zijn eigen
                lichaam aanvalt. Zijn huid wordt langzaam hard. Op zijn
                vingers zitten wondjes die niet genezen. Zijn gewrichten zijn
                stijf en doen pijn. Inmiddels zijn ook zijn longen en hart
                aangetast.
              </p>
              <p>
                Hij heeft vier maanden chemotherapie gehad. Dat heeft de
                ziekte niet gestopt. De artsen in Nijmegen zijn eerlijk tegen
                ons: de standaardbehandelingen werken bij hem niet meer.
              </p>
              <p className="hope">Maar er is nog een mogelijkheid.</p>
            </div>
          </div>

          <div>
            {/*
              Vervang deze placeholder door een echte foto van Tom:
              zet bijv. `tom.jpg` in de map /public en gebruik
              <img src="/tom.jpg" alt="Tom" />
            */}
            <div className="photo-placeholder light">
              <strong>Foto van Tom</strong>
              <span>Plaats hier een persoonlijke foto (vervang in Story.jsx)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
