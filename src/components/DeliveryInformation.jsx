import SectionTitle from './SectionTitle.jsx';

export default function DeliveryInformation() {
  return (
    <>
      <section className="info-card about-section" id="despachos" tabIndex={-1} aria-labelledby="delivery-heading">
        <SectionTitle id="delivery-heading" icon="truck">Despachos</SectionTitle>
        <p>Realizamos despachos a domicilio en <strong>Viña del Mar, Concón y sectores seleccionados de Valparaíso</strong>.</p>
        <div className="delivery-grid">
          <div className="about-tile">
            <h3>Costo de despacho</h3>
            <dl className="location-details mb-0">
              <dt>Compras inferiores a $25.000</dt><dd>$2.990</dd>
              <dt>Compras desde $25.000</dt><dd>Despacho gratis</dd>
            </dl>
          </div>
          <div className="about-tile">
            <h3>Tiempo de entrega</h3>
            <p><strong>Despacho estándar de 2 a 4 horas.</strong> Los pedidos realizados antes de las 18:00 h pueden llegar el mismo día, según disponibilidad y cobertura.</p>
            <p>En períodos de alta demanda, promociones o condiciones climáticas especiales, el tiempo de entrega podría extenderse.</p>
          </div>
          <div className="about-tile">
            <h3>Retiro en tienda</h3>
            <p>Retira gratis tu pedido en cualquiera de nuestras tiendas disponibles. Te enviaremos una notificación cuando esté listo para retirar.</p>
          </div>
        </div>
      </section>

      <section className="about-signoff" aria-labelledby="shop-heading">
        <h2 id="shop-heading">Compra con nosotros</h2>
        <p>En Avocado MiniMarket queremos que cada compra sea una experiencia sencilla, rápida y confiable.</p>
        <p><strong>Encuentra lo que necesitas. Compra cuando quieras. Recíbelo donde estés.</strong></p>
        <p className="eyebrow"><span aria-hidden="true">🥑</span> Avocado MiniMarket · Fresco. Fácil. Cerca de ti.</p>
      </section>
    </>
  );
}
