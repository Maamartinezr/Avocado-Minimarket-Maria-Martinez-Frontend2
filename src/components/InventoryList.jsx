import { useState } from 'react';
import { Link } from 'react-router';
import { useInventory } from '../inventory/InventoryContext.jsx';
import { filterProducts, statusLabels, stockStatus } from '../inventory/products.js';
import { articleDetailPath } from '../inventory/routes.js';
import { Icon } from './Icons.jsx';
import ProductSymbol from './ProductSymbol.jsx';

const actions = [
  { type: 'add', label: 'Agregar stock', icon: 'plus' },
  { type: 'subtract', label: 'Quitar stock', icon: 'minus' },
  { type: 'delete', label: 'Eliminar artículo', icon: 'trash' },
];

export default function InventoryList({ id = 'inventario', showBrand = false, onAction }) {
  const { products, categories } = useInventory();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const selectedCategory = categories.includes(category) ? category : '';
  const searchLabel = showBrand ? 'Buscar por producto, marca o SKU' : 'Buscar por producto o SKU';
  const columnCount = 4 + Number(showBrand) + Number(Boolean(onAction));
  const visibleProducts = filterProducts(products, selectedCategory, search, showBrand);

  return (
    <section className="inventory-panel" id={id} tabIndex={-1} aria-labelledby={`${id}-heading`}>
      <div className="inventory-toolbar">
        <div>
          <h2 id={`${id}-heading`}>Productos en inventario</h2>
          <p>Mostrando <span role="status">{visibleProducts.length} de {products.length} productos</span></p>
        </div>
        <div className="filters">
          <label className="search-field">
            <span className="visually-hidden">{searchLabel}</span>
            <Icon name="search" />
            <input className="form-control" type="search" placeholder={showBrand ? 'Producto, marca o SKU' : 'Buscar producto o SKU'} value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <label>
            <span className="visually-hidden">Filtrar por categoría</span>
            <select className="form-select" value={selectedCategory} onChange={(event) => setCategory(event.target.value)}>
              <option value="">Todas las categorías</option>
              {categories.map((name) => <option key={name}>{name}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="table-responsive table-scroll" tabIndex={0} role="region" aria-labelledby={`${id}-heading`}>
        <table className={`inventory-table table table-hover align-middle mb-0${showBrand ? ' inventory-table-full' : ''}`}>
          <thead>
            <tr>
              <th scope="col">Producto</th>
              {showBrand && <th scope="col">Marca</th>}
              <th scope="col">{showBrand ? 'Tipo de producto' : 'Categoría'}</th>
              <th scope="col">Existencias</th>
              <th scope="col">Estado</th>
              {onAction && <th className="inventory-row-actions" scope="col">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => {
              const { sku, name, brand, category: productCategory, stock, unit, symbol } = product;
              const status = stockStatus(stock);
              return (
                <tr key={sku}>
                  <th scope="row">
                    <div className="product">
                      <ProductSymbol symbol={symbol} />
                      <div><Link className="product-detail-link" to={articleDetailPath(sku)} state={{ fromInventory: true }}>{name}</Link><small>{sku}</small></div>
                    </div>
                  </th>
                  {showBrand && <td>{brand}</td>}
                  <td>{productCategory}</td>
                  <td><strong>{stock}</strong> {unit}</td>
                  <td><span className={`badge rounded-pill status ${status}`}>{statusLabels[status]}</span></td>
                  {onAction && (
                    <td className="inventory-row-actions">
                      <div className="inventory-action-group" role="group" aria-label={`Acciones de ${name} (${sku})`}>
                        {actions.map(({ type, label, icon }) => (
                          <button key={type} className={`inventory-row-button action-${type}`} type="button"
                            title={label} aria-label={`${label}: ${name} (${sku})`}
                            disabled={type === 'subtract' && stock === 0} onClick={() => onAction(product, type)}>
                            <Icon name={icon} />
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
            {visibleProducts.length === 0 && (
              <tr><td colSpan={columnCount} className="empty-table">{products.length ? 'No hay productos que coincidan con la búsqueda.' : 'El inventario está vacío.'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
