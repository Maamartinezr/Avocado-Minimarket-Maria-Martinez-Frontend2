import { useState } from 'react';
import { Link } from 'react-router';
import { useInventory } from '../inventory/InventoryContext.jsx';
import { filterProducts, productCategories } from '../inventory/products.js';
import { articleDetailPath } from '../inventory/routes.js';
import CartStepper from './CartStepper.jsx';
import { Icon } from './Icons.jsx';
import ProductSymbol from './ProductSymbol.jsx';

function CatalogCard({ product }) {
  const { setCartQuantity } = useInventory();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const { sku, name, brand, category, stock, unit, symbol, reserved = 0 } = product;

  async function update(quantity) {
    if (saving) return;
    setSaving(true);
    const result = await setCartQuantity(product, quantity);
    setSaving(false);
    setMessage(result.error ? { error: result.error } : { quantity: result.product.reserved });
  }

  return (
    <li className="info-card catalog-card tw:flex tw:flex-col tw:gap-3">
      <div className="catalog-card-art" aria-hidden="true">
        <ProductSymbol symbol={symbol} />
      </div>
      <div>
        <p className="eyebrow">{category}</p>
        <h3><Link className="product-detail-link" to={articleDetailPath(sku)}>{name}</Link></h3>
        <p>{brand} · Disponibles: {stock} {unit}</p>
      </div>
      <div className="catalog-card-actions tw:flex tw:flex-wrap tw:items-center tw:gap-2">
        <CartStepper product={product} onChange={update} disabled={saving} showQuantity showAddButton />
        {reserved > 0 && <button className="catalog-clear" type="button" disabled={saving} onClick={() => update(0)}>Quitar del carrito</button>}
      </div>
      {message?.error && <p role="alert">{message.error}</p>}
      <span className="visually-hidden" role="status">
        {message && !message.error ? `${name}: ${message.quantity} ${unit} en el carrito.` : ''}
      </span>
    </li>
  );
}

export default function Catalog() {
  const { products } = useInventory();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const available = products.filter((product) => product.stock > 0 || product.reserved > 0);
  const categories = productCategories(available);
  const selected = categories.includes(category) ? category : '';
  const matches = filterProducts(available, selected, search, true);

  return (
    <section id="catalogo" className="catalog" tabIndex={-1} aria-labelledby="catalog-heading">
      <div className="catalog-toolbar tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-3">
        <div>
          <p className="eyebrow">Encuentra tus favoritos</p>
          <h2 id="catalog-heading">Catálogo de productos</h2>
          <p role="status">{matches.length} {matches.length === 1 ? 'producto' : 'productos'}</p>
        </div>
        <div className="filters">
          <label className="search-field">
            <span className="visually-hidden">Buscar en el catálogo</span><Icon name="search" />
            <input className="form-control" type="search" placeholder="Buscar productos" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <label>
            <span className="visually-hidden">Filtrar por categoría</span>
            <select className="form-select" value={selected} onChange={(event) => setCategory(event.target.value)}>
              <option value="">Todas las categorías</option>
              {categories.map((name) => <option key={name}>{name}</option>)}
            </select>
          </label>
        </div>
      </div>
      {matches.length ? (
        <ul className="list-unstyled tw:grid tw:gap-3 tw:sm:grid-cols-2 tw:lg:grid-cols-3">
          {matches.map((product) => <CatalogCard key={product.sku} product={product} />)}
        </ul>
      ) : <p className="info-card">No encontramos productos para esta selección.</p>}
    </section>
  );
}
