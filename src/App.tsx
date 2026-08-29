import { MessageCircle, Search, Sparkles } from 'lucide-react'

const WHATSAPP = '51967539019'

const categories = [
  'Bocaditos clásicos',
  'Bocaditos especiales',
  'Bocaditos premium',
  'Bocaditos para niños',
  'Postres',
  'Kekes y dulces',
]

const openWhatsApp = (message: string) => {
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
}

export default function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Bocatto inicio">
          <span className="brand-mark">B</span>
          <span>
            <strong>BOCATTO</strong>
            <small>Bocaditos para eventos</small>
          </span>
        </a>
        <nav>
          <a href="#catalogo">Catálogo</a>
          <a href="#eventos">Eventos</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <button className="whatsapp-button small" onClick={() => openWhatsApp('Hola Bocatto, quisiera información sobre sus bocaditos para eventos.')}> 
          <MessageCircle size={18} /> Cotizar
        </button>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={16} /> Detalles deliciosos para momentos especiales</span>
          <h1>Tu evento merece<br /><em>un sabor inolvidable.</em></h1>
          <p>Descubre bocaditos dulces, salados, opciones premium, infantiles y postres pensados para cumpleaños, reuniones, bodas, empresas y celebraciones.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#catalogo">Ver catálogo</a>
            <button className="secondary-button" onClick={() => openWhatsApp('Hola Bocatto, quiero cotizar bocaditos para mi evento.')}> 
              <MessageCircle size={19} /> Cotizar por WhatsApp
            </button>
          </div>
          <div className="hero-points">
            <span>Pedidos para eventos</span>
            <span>Variedad de presentaciones</span>
            <span>Atención directa por WhatsApp</span>
          </div>
        </div>
        <div className="hero-card" aria-label="Presentación Bocatto">
          <div className="logo-placeholder">
            <span className="ornament">♡</span>
            <strong>BOCATTO</strong>
            <small>BOCADITOS PARA EVENTOS</small>
          </div>
          <p>Elegancia, variedad y sabor para compartir.</p>
        </div>
      </section>

      <section id="catalogo" className="catalog-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Nuestro catálogo</span>
            <h2>Encuentra el bocadito perfecto</h2>
          </div>
          <div className="search-shell"><Search size={18} /><input aria-label="Buscar productos" placeholder="Buscar por nombre..." /></div>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <article className="category-card" key={category}>
              <span className="category-index">0{index + 1}</span>
              <h3>{category}</h3>
              <p>Explora variedades, presentaciones y opciones para tu celebración.</p>
              <button onClick={() => openWhatsApp(`Hola Bocatto, quisiera información sobre ${category}.`)}>Consultar <span>→</span></button>
            </article>
          ))}
        </div>
      </section>

      <section id="eventos" className="event-section">
        <span className="eyebrow">Hecho para celebrar</span>
        <h2>Bocatto acompaña tus mejores momentos.</h2>
        <p>Cumpleaños, eventos infantiles, bodas, aniversarios, coffee breaks, reuniones corporativas y celebraciones privadas.</p>
        <button className="primary-button" onClick={() => openWhatsApp('Hola Bocatto, necesito ayuda para elegir bocaditos para mi evento.')}>Ayúdame a elegir</button>
      </section>

      <footer id="contacto">
        <div className="brand footer-brand"><span className="brand-mark">B</span><span><strong>BOCATTO</strong><small>Bocaditos para eventos</small></span></div>
        <div><strong>¿Tienes un evento?</strong><p>Escríbenos y armamos contigo una propuesta según la cantidad de invitados.</p></div>
        <button className="whatsapp-button" onClick={() => openWhatsApp('Hola Bocatto, quisiera realizar una cotización.')}> <MessageCircle size={20} /> +51 967 539 019</button>
      </footer>

      <button className="floating-whatsapp" aria-label="Contactar a Bocatto por WhatsApp" onClick={() => openWhatsApp('Hola Bocatto, quisiera información sobre sus productos.')}>
        <MessageCircle size={26} />
      </button>
    </main>
  )
}
