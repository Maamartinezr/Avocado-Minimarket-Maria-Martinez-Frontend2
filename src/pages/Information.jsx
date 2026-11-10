import { Link } from 'react-router';
import { Icon } from '../components/Icons.jsx';

const questions = [
  {
    question: '¿Cómo consulto si un producto está disponible?',
    answer: 'En Catálogo, busca el nombre del producto o su código SKU. Cada tarjeta indica las existencias disponibles y puedes abrir el nombre para ver el detalle.',
  },
  {
    question: '¿Qué significa «Stock bajo»?',
    answer: 'El producto tiene una cantidad mayor que cero y menor que 10 en la unidad indicada. Cuando llega a cero, su estado cambia a Agotado.',
  },
  {
    question: '¿Dónde puedo consultar el catálogo y la guía de compra?',
    answer: 'En Catálogo puedes consultar los productos, agregarlos al carrito y ajustar las cantidades. En Cómo comprar encontrarás la guía de compra en línea.',
  },
  {
    question: '¿Dónde encuentro los horarios de cada tienda?',
    answer: 'En Nuestras tiendas encontrarás las direcciones, horarios y teléfonos de Viña Centro, Recreo y Concón, junto con un enlace para obtener indicaciones.',
  },
  {
    question: '¿Cuánto cuesta el despacho a domicilio?',
    answer: 'El despacho cuesta $2.990 en compras inferiores a $25.000. Desde $25.000 es gratis dentro de la cobertura indicada en la sección Despachos.',
  },
  {
    question: '¿Puedo retirar mi pedido en una tienda?',
    answer: 'La guía de compra contempla retiro gratuito en las tiendas disponibles. Recibirás una notificación cuando el pedido esté listo para retirar.',
  },
  {
    question: '¿Cómo hago una consulta sobre un producto?',
    answer: 'En Contáctanos encontrarás el teléfono, el correo y WhatsApp. Si tu consulta es por un producto específico, indica su nombre o SKU y la sucursal.',
  },
  {
    question: '¿Cómo confirmo el stock en una sucursal?',
    answer: 'Comunícate con la sucursal de tu interés para confirmar la disponibilidad. Encontrarás el teléfono de cada sucursal en Nuestras tiendas.',
  },
];

export function Faq() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">CENTRO DE AYUDA</p>
        <h1>Preguntas frecuentes</h1>
        <p>Consulta cómo interpretar el stock, encontrar una tienda y hacer tus compras.</p>
      </section>

      <div className="faq-list">
        {questions.map(({ question, answer }) => (
          <details key={question}>
            <summary>{question}<Icon name="plus" /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <div className="help-card">
        <span className="icon-tile green"><Icon name="mail" /></span>
        <div><h2>¿Tienes otra consulta?</h2><p>Encuentra nuestros canales de atención.</p></div>
        <Link className="action-link" to="/quienes-somos#contactanos">Contáctanos <Icon name="arrow" /></Link>
      </div>
    </>
  );
}
