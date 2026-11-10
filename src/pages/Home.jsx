import marketPhoto from '../assets/canasta-mercado.webp';
import Catalog from '../components/Catalog.jsx';
import DeliveryInformation from '../components/DeliveryInformation.jsx';
import { Icon } from '../components/Icons.jsx';

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="home-heading">
        <img className="hero-image" src={marketPhoto} alt="" width="2172" height="724" fetchPriority="high" />
        <div className="hero-copy">
          <p className="eyebrow">Catálogo de productos</p>
          <h1 id="home-heading">Todo lo que necesitas,<br /><em>más cerca de ti</em></h1>
          <p className="hero-description">Encuentra productos frescos y tus favoritos de todos los días. Elige lo que necesitas y agrégalo a tu carrito.</p>
          <a className="hero-action" href="#catalogo">Ver productos <Icon name="arrow" /></a>
        </div>
      </section>

      <Catalog />
      <div className="about-sections tw:mt-6">
        <DeliveryInformation />
      </div>
    </>
  );
}
