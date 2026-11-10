import { useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import CartStepper from '../components/CartStepper.jsx';
import { Icon } from '../components/Icons.jsx';
import ProductSymbol from '../components/ProductSymbol.jsx';
import QuantityInput from '../components/QuantityInput.jsx';
import { useInventory } from '../inventory/InventoryContext.jsx';
import { addQuantities, statusLabels, stockStatus } from '../inventory/products.js';
import { articleDetailPath, articlesPath, cartPath, catalogPath } from '../inventory/routes.js';

const shopButton = 'inventory-action tw:inline-flex tw:min-h-11 tw:items-center tw:justify-center tw:gap-2 tw:rounded-full tw:border-0 tw:bg-avocado-lime tw:px-5 tw:py-2 tw:text-sm tw:font-bold tw:hover:bg-avocado-sun';
const feedback = 'tw:rounded-xl tw:px-4 tw:py-3 tw:text-sm tw:font-semibold';

function AddToCart({ product }) {
  const { setCartQuantity } = useInventory();
  const [message, setMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const { stock, unit, reserved = 0 } = product;

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;
    const amount = Number(new FormData(event.currentTarget).get('quantity'));
    if (!(amount > 0 && amount <= stock)) {
      setMessage({ error: 'Ingresa una cantidad mayor que cero y dentro del stock disponible.' });
      return;
    }

    setSaving(true);
    const result = await setCartQuantity(product, addQuantities(reserved, amount, unit));
    setSaving(false);
    setMessage(result.error ? { error: result.error } : { success: `Agregaste ${amount} ${unit} al carrito.` });
  }

  return (
    <section className="info-card inventory-entry tw:grid tw:gap-4" aria-labelledby="purchase-heading">
      <h2 id="purchase-heading">Agregar al carrito</h2>
      <p>En tu carrito: <strong>{reserved} {unit}</strong></p>
      {stock > 0 ? (
        <form className="tw:grid tw:gap-3" onSubmit={handleSubmit}>
          <QuantityInput key={stock} label={`Cantidad (${unit})`} unit={unit} min={unit === 'kg' ? 0 : 1}
            max={stock} defaultValue={Math.min(1, stock)} />
          <button type="submit" className={shopButton} disabled={saving}><Icon name="cart" /> Agregar al carrito</button>
        </form>
      ) : <p>Este artículo está agotado.</p>}
      {message && <div className={`${feedback} ${message.error ? 'tw:bg-avocado-salmon-light' : 'tw:bg-avocado-cream'}`}
        role={message.error ? 'alert' : 'status'}>{message.error || message.success}</div>}
      <Link className="action-link" to={cartPath}>Ver carrito <Icon name="arrow" /></Link>
    </section>
  );
}

export function ArticleDetail() {
  const { sku } = useParams();
  const { state } = useLocation();
  const { products } = useInventory();
  const product = products.find((item) => item.sku === sku?.toUpperCase());
  const returnPath = state?.fromInventory ? articlesPath : catalogPath;
  const returnLabel = state?.fromInventory ? 'Volver al panel' : 'Volver al catálogo';

  if (!product) {
    return (
      <section className="page-intro">
        <p className="eyebrow">Inventario</p><h1>Artículo no encontrado</h1>
        <Link className="action-link" to={returnPath}>{returnLabel} <Icon name="arrow" /></Link>
      </section>
    );
  }

  const status = stockStatus(product.stock);
  return (
    <>
      <section className="page-intro" aria-labelledby="detail-heading">
        <p className="eyebrow">Detalle del artículo</p>
        <h1 id="detail-heading">{product.name}</h1>
        <Link className="action-link" to={returnPath}>{returnLabel} <Icon name="arrow" /></Link>
      </section>
      <div className="tw:grid tw:items-start tw:gap-4 tw:md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <section className="info-card tw:grid tw:gap-4" aria-labelledby="product-info-heading">
          <div className="tw:flex tw:items-center tw:gap-3"><ProductSymbol symbol={product.symbol} /><h2 id="product-info-heading">Información del producto</h2></div>
          <dl className="location-details tw:grid tw:grid-cols-2 tw:gap-3">
            <div><dt>SKU</dt><dd>{product.sku}</dd></div>
            <div><dt>Marca</dt><dd>{product.brand}</dd></div>
            <div><dt>Tipo de producto</dt><dd>{product.category}</dd></div>
            <div><dt>Stock disponible</dt><dd>{product.stock} {product.unit}</dd></div>
            <div><dt>Estado</dt><dd><span className={`badge rounded-pill status ${status}`}>{statusLabels[status]}</span></dd></div>
          </dl>
        </section>
        <AddToCart key={product.sku} product={product} />
      </div>
    </>
  );
}

function CartItem({ product, onUpdated }) {
  const { setCartQuantity } = useInventory();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const { sku, name, brand, category, symbol, stock, reserved, unit } = product;
  const maximum = addQuantities(reserved, stock, unit);

  async function update(quantity) {
    if (saving) return;
    setError('');
    setSaving(true);
    const result = await setCartQuantity(product, quantity);
    setSaving(false);
    if (result.error) setError(result.error);
    else onUpdated(result.product);
  }

  function submitQuantity(event) {
    event.preventDefault();
    update(Number(new FormData(event.currentTarget).get('quantity')));
  }

  return (
    <li className="info-card tw:grid tw:gap-4">
      <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-3">
        <ProductSymbol symbol={symbol} />
        <div>
          <h2><Link className="product-detail-link" to={articleDetailPath(sku)}>{name}</Link></h2>
          <p>{brand} · {category} · {sku}</p>
        </div>
      </div>
      <p>En el carrito: <strong>{reserved} {unit}</strong> · Disponible para agregar: <strong>{stock} {unit}</strong></p>
      <form className="inventory-entry tw:flex tw:flex-wrap tw:items-end tw:gap-2" onSubmit={submitQuantity} aria-label={`Cantidad de ${name}`}>
        <QuantityInput key={reserved} label={`Cantidad en el carrito (${unit})`} unit={unit} min={0} max={maximum} defaultValue={reserved} />
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          <CartStepper product={product} onChange={update} disabled={saving} />
          <button className={shopButton} type="submit" disabled={saving}>Actualizar</button>
          <button className="inventory-remove" type="button" disabled={saving} onClick={() => update(0)}>Quitar del carrito</button>
        </div>
      </form>
      {error && <div className={`${feedback} tw:bg-avocado-salmon-light`} role="alert">{error}</div>}
    </li>
  );
}

function CheckoutSummary({ productCount }) {
  return (
    <aside className="info-card checkout-summary tw:grid tw:gap-3" aria-labelledby="checkout-heading">
      <span className="icon-tile green"><Icon name="bag" /></span>
      <h2 id="checkout-heading">Resumen del carrito</h2>
      <dl className="checkout-count">
        <dt>Productos distintos</dt><dd>{productCount}</dd>
      </dl>
      <div className="checkout-control">
        <button className="checkout-button" type="button" aria-disabled="true" aria-describedby="checkout-message">
          Proceder al pago <Icon name="arrow" />
        </button>
        <p className="checkout-tooltip" id="checkout-message" role="tooltip">Función no disponible por el momento</p>
      </div>
    </aside>
  );
}

export function Cart() {
  const { cart } = useInventory();
  const [notice, setNotice] = useState('');
  const headingRef = useRef(null);

  function announceUpdate(product) {
    setNotice(product.reserved
      ? `«${product.name}» actualizado a ${product.reserved} ${product.unit} en el carrito.`
      : `«${product.name}» retirado del carrito. Las existencias volvieron al inventario.`);
    if (!product.reserved) headingRef.current?.focus();
  }

  return (
    <>
      <section className="page-intro" aria-labelledby="cart-heading">
        <p className="eyebrow">Tus artículos</p>
        <h1 id="cart-heading" ref={headingRef} tabIndex={-1}>Carrito de compras</h1>
        <p>Las cantidades de tu carrito se reservan en el inventario de este navegador.</p>
        <Link className="action-link" to={catalogPath}>Volver al catálogo <Icon name="arrow" /></Link>
      </section>
      {notice && <div className={`${feedback} tw:mb-4 tw:bg-avocado-cream`} role="status">{notice}</div>}
      <div className="tw:grid tw:items-start tw:gap-4 tw:md:grid-cols-[minmax(0,2fr)_minmax(245px,1fr)]">
        {cart.length ? (
          <ul className="list-unstyled mb-0 tw:grid tw:gap-3">
            {cart.map((product) => <CartItem key={product.sku} product={product} onUpdated={announceUpdate} />)}
          </ul>
        ) : (
          <section className="info-card tw:grid tw:justify-items-start tw:gap-3">
            <span className="icon-tile green"><Icon name="cart" /></span>
            <h2>Tu carrito está vacío</h2>
            <p>Agrega un producto desde el catálogo.</p>
            <Link className={shopButton} to={catalogPath}>Ver productos <Icon name="arrow" /></Link>
          </section>
        )}
        <CheckoutSummary productCount={cart.length} />
      </div>
    </>
  );
}
