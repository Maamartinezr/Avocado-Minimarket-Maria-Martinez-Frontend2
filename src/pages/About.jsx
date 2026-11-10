import { Link } from 'react-router';
import { catalogPath } from '../inventory/routes.js';
import { Icon } from '../components/Icons.jsx';
import DeliveryInformation from '../components/DeliveryInformation.jsx';
import SectionTitle from '../components/SectionTitle.jsx';

const email = 'hola@avocadominimarket.cl';
const mainPhone = '+56 9 6123 4587';

const sections = [
  ['nuestras-tiendas', 'Nuestras tiendas'],
  ['contactanos', 'Contáctanos'],
  ['como-comprar', 'Cómo comprar'],
  ['despachos', 'Despachos'],
];

const stores = [
  { name: 'Viña Centro', address: 'Calle Valparaíso 785, Viña del Mar, Región de Valparaíso', hours: '08:00 a 22:30', phone: mainPhone },
  { name: 'Recreo', address: 'Avenida España 1245, Recreo, Viña del Mar, Región de Valparaíso', hours: '08:00 a 22:00', phone: '+56 9 6345 7821' },
  { name: 'Concón', address: 'Avenida Concón-Reñaca 3180, Concón, Región de Valparaíso', hours: '08:30 a 22:30', phone: '+56 9 6578 2143' },
];

const values = [
  ['🥑', 'Frescura', 'Seleccionamos nuestros productos pensando en la calidad y satisfacción de nuestros clientes.'],
  ['🛒', 'Variedad', 'Encontrarás productos para distintas necesidades en un solo lugar.'],
  ['⚡', 'Rapidez', 'Queremos que puedas comprar de manera sencilla y eficiente.'],
  ['🤝', 'Cercanía', 'Valoramos a nuestros clientes y buscamos entregar siempre una atención amable y personalizada.'],
  ['💚', 'Confianza', 'Trabajamos para construir relaciones duraderas con quienes nos eligen cada día.'],
];

const categories = [
  '🥑 Frutas y verduras', '🥛 Lácteos y refrigerados', '🥖 Panadería',
  '🥤 Bebidas', '🍪 Snacks y confitería', '🧹 Limpieza del hogar',
  '🧴 Higiene y cuidado personal', '🐱 Productos para mascotas', '🛒 Despensa',
];

function PhoneLink({ phone }) {
  return <a href={`tel:${phone.replaceAll(' ', '')}`}>{phone}</a>;
}

function ContactForm() {
  function openDraft(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const subject = encodeURIComponent(fields.get('subject').trim());
    const body = encodeURIComponent(`Nombre: ${fields.get('name').trim()}\r\nCorreo: ${fields.get('email').trim()}\r\n\r\n${fields.get('message').trim()}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={openDraft}>
      <h3>Envíanos un mensaje</h3>
      <div className="row g-3 mt-0">
        <label className="col-12 col-sm-6">
          <span className="form-label">Nombre</span>
          <input className="form-control" name="name" autoComplete="name" placeholder="Escribe tu nombre" required />
        </label>
        <label className="col-12 col-sm-6">
          <span className="form-label">Correo electrónico</span>
          <input className="form-control" type="email" name="email" autoComplete="email" placeholder="Escribe tu correo" required />
        </label>
        <label className="col-12">
          <span className="form-label">Asunto</span>
          <input className="form-control" name="subject" placeholder="Motivo de tu consulta" required />
        </label>
        <label className="col-12">
          <span className="form-label">Mensaje</span>
          <textarea className="form-control" name="message" rows="4" placeholder="Escribe tu mensaje" required />
        </label>
      </div>
      <p className="contact-note" id="form-note">El botón abre tu aplicación de correo con el mensaje listo para que lo revises y envíes.</p>
      <button className="about-button" type="submit" aria-describedby="form-note">Enviar mensaje <Icon name="arrow" /></button>
    </form>
  );
}

export default function About() {
  return (
    <>
      <section className="page-intro about-intro" aria-labelledby="about-heading">
        <p className="eyebrow">Conoce el minimarket</p>
        <h1 id="about-heading">Quiénes somos</h1>
        <h2>Tu minimarket, más cerca de ti <span aria-hidden="true">🥑</span></h2>
        <p>En <strong>Avocado MiniMarket</strong> creemos que hacer tus compras del día a día debería ser fácil, rápido y agradable.</p>
        <nav className="about-shortcuts" aria-label="Secciones de Quiénes somos">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
      </section>

      <div className="about-sections">
        <section className="info-card about-section" aria-labelledby="values-heading">
          <div className="about-story">
            <p>Somos un minimarket pensado para acompañarte en cada momento, ofreciéndote una selección de productos para tu hogar, alimentación y necesidades diarias, con una atención cercana y un servicio pensado para hacerte la vida más simple.</p>
            <p>Nos mueve la calidad, la variedad y el compromiso con nuestros clientes. Queremos ser ese lugar al que puedes acudir cuando necesitas una compra rápida, encontrar tus productos favoritos o simplemente resolver lo que necesitas sin complicaciones.</p>
          </div>
          <div className="row g-3 mt-0 mb-4">
            <div className="col-12 col-md-6">
              <div className="about-tile h-100">
                <h3>Nuestra misión</h3>
                <p>Ofrecer una experiencia de compra <strong>rápida, cómoda y confiable</strong>, combinando productos de calidad, precios competitivos y una atención cercana.</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="about-tile h-100">
                <h3>Nuestra visión</h3>
                <p>Convertirnos en el minimarket de confianza de nuestra comunidad, creciendo junto a nuestros clientes y adaptándonos constantemente a sus necesidades.</p>
              </div>
            </div>
          </div>
          <h2 id="values-heading">Lo que nos caracteriza</h2>
          <ul className="values-grid list-unstyled mb-0">
            {values.map(([symbol, title, description]) => (
              <li className="about-tile" key={title}>
                <span className="value-symbol" aria-hidden="true">{symbol}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="info-card about-section" id="nuestras-tiendas" tabIndex={-1} aria-labelledby="stores-heading">
          <SectionTitle id="stores-heading" icon="store">Nuestras tiendas</SectionTitle>
          <p>Encuentra tu <strong>Avocado MiniMarket</strong> más cercano y disfruta de una experiencia de compra rápida, cómoda y conveniente.</p>
          <ul className="store-list list-unstyled mb-0">
            {stores.map(({ name, address, hours, phone }) => (
              <li className="about-tile" key={name}>
                <p className="eyebrow">Avocado MiniMarket</p>
                <h3>{name}</h3>
                <dl className="location-details">
                  <dt>Dirección</dt><dd>{address}</dd>
                  <dt>Horario</dt><dd>Lunes a domingo, de {hours} h.</dd>
                  <dt>Teléfono</dt><dd><PhoneLink phone={phone} /></dd>
                </dl>
                <a className="action-link" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" aria-label={`Cómo llegar a ${name} en Google Maps`}>
                  Cómo llegar <Icon name="arrow" />
                </a>
              </li>
            ))}
          </ul>
          <p className="about-callout">¿Tienes dudas sobre nuestros productos, horarios o disponibilidad? <a href="#contactanos">Contáctanos</a> y estaremos felices de ayudarte.</p>
        </section>

        <section className="info-card about-section" id="contactanos" tabIndex={-1} aria-labelledby="contact-heading">
          <SectionTitle id="contact-heading" icon="mail">Contáctanos</SectionTitle>
          <p>¿Tienes alguna pregunta, sugerencia o necesitas información sobre nuestros productos? Estamos aquí para ayudarte.</p>
          <div className="row g-4 mt-0">
            <div className="col-12 col-lg-5">
              <dl className="location-details contact-channels">
                <dt>Teléfono</dt><dd><PhoneLink phone={mainPhone} /></dd>
                <dt>Correo</dt><dd><a href={`mailto:${email}`}>{email}</a></dd>
                <dt>WhatsApp</dt><dd><a href={`https://wa.me/${mainPhone.replace(/\D/g, '')}`}>{mainPhone}</a></dd>
                <dt>Atención</dt><dd>Viña del Mar, Concón y alrededores</dd>
              </dl>
              <h3>Redes sociales</h3>
              <p>También puedes escribirnos a través de nuestras redes sociales.</p>
              <dl className="location-details contact-channels">
                <dt>Instagram</dt><dd><a href="https://www.instagram.com/avocadominimarket/">@avocadominimarket</a></dd>
                <dt>Facebook</dt><dd>Avocado MiniMarket</dd>
                <dt>TikTok</dt><dd><a href="https://www.tiktok.com/@avocadominimarket">@avocadominimarket</a></dd>
              </dl>
            </div>
            <div className="col-12 col-lg-7"><ContactForm /></div>
          </div>
          <p className="about-callout">Nuestro equipo responde dentro de su horario de atención, normalmente en un plazo máximo de <strong>24 horas hábiles</strong>.</p>
        </section>

        <section className="info-card about-section" id="como-comprar" tabIndex={-1} aria-labelledby="buy-heading">
          <SectionTitle id="buy-heading" icon="bag">Cómo comprar</SectionTitle>
          <p>Comprar en <strong>Avocado MiniMarket</strong> es fácil.</p>
          <p className="about-callout">Usa «Comenzar a comprar» para consultar el catálogo y revisar las existencias.</p>
          <ol className="shopping-steps">
            <li><h3>Explora nuestros productos</h3><p>Navega por el catálogo y encuentra todo lo que necesitas. Puedes explorar categorías como:</p>
              <ul className="category-list list-unstyled">{categories.map((category) => <li key={category}>{category}</li>)}</ul>
            </li>
            <li><h3>Agrega tus productos al carrito</h3><p>Selecciona los productos que deseas comprar, indica la cantidad y agrégalos a tu carrito.</p></li>
            <li><h3>Revisa tu pedido</h3><p>Antes de finalizar, verifica los productos seleccionados, las cantidades, el costo de despacho y el total de tu compra.</p></li>
            <li><h3>Completa tus datos</h3><p>Ingresa tu nombre, teléfono, correo electrónico y dirección de despacho. También puedes seleccionar <strong>Retiro en tienda</strong> si prefieres retirar tu pedido personalmente.</p></li>
            <li><h3>Selecciona tu forma de pago</h3><p>Puedes pagar de forma segura utilizando:</p>
              <ul className="payment-list">
                <li>Tarjetas de crédito y débito</li><li>Webpay</li><li>Transferencia bancaria</li><li>Pago en efectivo al retirar en tienda</li>
              </ul>
            </li>
            <li><h3>Confirma tu compra</h3><p>Una vez confirmado el pedido, recibirás un correo electrónico y un mensaje de WhatsApp con el resumen de tu compra y la información correspondiente a la entrega.</p></li>
          </ol>
          <div className="buy-cta">
            <div><p className="eyebrow">¡Así de fácil!</p><h3>Compra online, rápido y sin complicaciones.</h3></div>
            <Link className="about-button" to={catalogPath}>Comenzar a comprar <Icon name="arrow" /></Link>
          </div>
        </section>

        <DeliveryInformation />
      </div>
    </>
  );
}
