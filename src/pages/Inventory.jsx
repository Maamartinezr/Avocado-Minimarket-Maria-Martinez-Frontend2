import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Icon } from '../components/Icons.jsx';
import InventoryList from '../components/InventoryList.jsx';
import QuantityInput from '../components/QuantityInput.jsx';
import { useInventory } from '../inventory/InventoryContext.jsx';
import { lowStockLimit } from '../inventory/products.js';
import { addArticlePath, articlesPath } from '../inventory/routes.js';

const actionButton = 'inventory-action tw:inline-flex tw:min-h-11 tw:items-center tw:justify-center tw:gap-2 tw:rounded-full tw:px-5 tw:py-2 tw:text-sm tw:font-bold';
const primaryAction = `${actionButton} tw:border-0 tw:bg-avocado-lime tw:hover:bg-avocado-sun`;

export function AddArticle() {
  const { products, categories, addProduct } = useInventory();
  const [unit, setUnit] = useState('un.');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    const result = await addProduct(Object.fromEntries(new FormData(event.currentTarget)));
    setSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    navigate(articlesPath, { state: { addedName: result.product.name } });
  }

  return (
    <>
      <section className="page-intro" aria-labelledby="add-article-heading">
        <p className="eyebrow">Gestión de inventario</p>
        <h1 id="add-article-heading">Agregar artículo</h1>
        <p>Registra un producto con su marca, tipo y existencias iniciales.</p>
      </section>

      <div className="tw:grid tw:items-start tw:gap-5 tw:lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <form className="info-card inventory-entry tw:grid tw:gap-5" onSubmit={handleSubmit} aria-labelledby="article-fields-heading">
          <div className="tw:grid tw:gap-1">
            <h2 id="article-fields-heading">Datos del artículo</h2>
            <p className="tw:text-sm">Todos los campos son obligatorios.</p>
          </div>

          <div className="tw:grid tw:gap-4 tw:sm:grid-cols-2">
            <label className="tw:block tw:sm:col-span-2">
              <span className="form-label">Nombre del producto</span>
              <input className="form-control" name="name" maxLength={100} placeholder="Ej. Leche semidescremada 1 L" required />
            </label>
            <label className="tw:block">
              <span className="form-label">Marca</span>
              <input className="form-control" name="brand" maxLength={70} placeholder="Ej. Sin marca" required />
            </label>
            <label className="tw:block">
              <span className="form-label">Tipo de producto</span>
              <input className="form-control" name="category" maxLength={70} list="inventory-categories" placeholder="Ej. Lácteos" required />
            </label>
            <label className="tw:block tw:sm:col-span-2">
              <span className="form-label">Código SKU</span>
              <input className="form-control" name="sku" maxLength={24} placeholder="Ej. LAC-003" aria-describedby="sku-help" required />
            </label>
            <label className="tw:block">
              <span className="form-label">Existencias iniciales</span>
              <input className="form-control" type="number" name="stock" min="0" step={unit === 'kg' ? 'any' : '1'} placeholder="0" required />
            </label>
            <label className="tw:block">
              <span className="form-label">Unidad de medida</span>
              <select className="form-select" name="unit" value={unit} onChange={(event) => setUnit(event.target.value)}>
                <option value="un.">Unidades</option>
                <option value="kg">Kilogramos</option>
              </select>
            </label>
          </div>
          <datalist id="inventory-categories">{categories.map((category) => <option key={category} value={category} />)}</datalist>

          {error && <p className="tw:rounded-xl tw:bg-avocado-salmon-light tw:px-4 tw:py-3 tw:text-sm tw:font-semibold" role="alert">{error}</p>}
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-4">
            <button className={primaryAction} type="submit" disabled={saving}><Icon name="plus" /> Guardar artículo</button>
            <Link className="action-link tw:text-sm" to={articlesPath}>Volver al panel</Link>
          </div>
        </form>

        <aside className="info-card tw:grid tw:gap-3" aria-labelledby="inventory-help-heading">
          <span className="icon-tile salmon"><Icon name="box" /></span>
          <h2 id="inventory-help-heading">Registro de inventario</h2>
          <p id="sku-help">El SKU identifica cada artículo. Usa un código distinto para cada producto.</p>
          <p>Hay <strong>{products.length} artículos</strong> registrados. Los nuevos registros se guardan en este navegador.</p>
        </aside>
      </div>
    </>
  );
}

function InventoryMetrics() {
  const { products, categories } = useInventory();
  const metrics = [
    { icon: 'box', tone: 'green', count: products.length, label: 'Productos registrados', note: `${categories.length} categorías` },
    { icon: 'check', tone: 'lime', count: products.filter(({ stock }) => stock > 0).length, label: 'Productos con stock', note: 'Incluye stock bajo' },
    { icon: 'alert', tone: 'salmon', count: products.filter(({ stock }) => stock < lowStockLimit).length, label: 'Por reponer', note: 'Incluye agotados' },
  ];
  return (
    <section className="metrics row row-cols-3 g-2 g-md-3" aria-label="Resumen de inventario">
      {metrics.map(({ icon, tone, count, label, note }) => (
        <div className="col" key={label}>
          <article className="metric h-100">
            <span className={`icon-tile ${tone}`}><Icon name={icon} /></span>
            <div><p>{label}</p><strong>{count}</strong><small>{note}</small></div>
          </article>
        </div>
      ))}
    </section>
  );
}

export function InventoryPanel() {
  const { state } = useLocation();
  const { changeProduct } = useInventory();
  const [pendingAction, setPendingAction] = useState(null);
  const [actionError, setActionError] = useState('');
  const [actionNotice, setActionNotice] = useState('');
  const [saving, setSaving] = useState(false);
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const notice = actionNotice || (state?.addedName && `Se agregó «${state.addedName}» al inventario.`);
  const deleting = pendingAction?.type === 'delete';
  const subtracting = pendingAction?.type === 'subtract';
  const selected = pendingAction?.product;
  const title = deleting ? '¿Eliminar artículo?' : subtracting ? 'Quitar stock' : 'Agregar stock';

  useEffect(() => {
    if (pendingAction && !dialogRef.current.open) dialogRef.current.showModal();
  }, [pendingAction]);

  function requestAction(product, type) {
    setActionError('');
    setPendingAction({ product, type });
  }

  async function confirmAction(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    const quantity = Number(new FormData(event.currentTarget).get('quantity'));
    const result = await changeProduct(selected, pendingAction.type, quantity);
    setSaving(false);
    if (result.error) {
      setActionError(result.error);
      return;
    }

    setActionNotice(deleting
      ? `Se eliminó «${selected.name}» del inventario.`
      : `Stock de «${selected.name}» actualizado a ${result.product.stock} ${selected.unit}`);
    dialogRef.current?.close();
    if (deleting) headingRef.current?.focus();
  }

  return (
    <>
      <section className="page-intro inventory-banner" aria-labelledby="article-list-heading">
        <p className="eyebrow">Gestión de existencias</p>
        <h1 id="article-list-heading" ref={headingRef} tabIndex={-1}>Panel de inventario</h1>
        <p>Consulta las existencias del minimarket y detecta qué productos necesitan reposición.</p>
        <a className="hero-action" href="#listado-articulos">Ver inventario <Icon name="arrow" /></a>
      </section>

      <InventoryMetrics />
      <div className="inventory-panel-actions tw:flex tw:flex-wrap tw:items-center tw:justify-between tw:gap-3">
        <p>Usa <strong>+</strong> para agregar stock, <strong>−</strong> para quitar stock o la papelera para eliminar un artículo.</p>
        <Link className={primaryAction} to={addArticlePath}><Icon name="plus" /> Agregar artículo</Link>
      </div>

      {notice && (
        <div className="tw:mb-4 tw:flex tw:items-center tw:gap-2 tw:rounded-xl tw:border tw:border-avocado-border tw:bg-avocado-surface tw:px-4 tw:py-3 tw:font-semibold tw:text-avocado-olive" role="status">
          <Icon name="check" /> {notice}
        </div>
      )}
      <InventoryList id="listado-articulos" showBrand onAction={requestAction} />

      <dialog className="info-card inventory-stock-dialog" ref={dialogRef} onClose={() => setPendingAction(null)}
        onCancel={(event) => { if (saving) event.preventDefault(); }}
        aria-labelledby="stock-action-heading" aria-describedby="stock-action-message">
        {selected && (
          <form className="inventory-entry tw:grid tw:gap-4" onSubmit={confirmAction}>
            <span className={`icon-tile ${deleting ? 'salmon' : 'green'}`}><Icon name={deleting ? 'trash' : subtracting ? 'minus' : 'plus'} /></span>
            <h2 id="stock-action-heading">{title}</h2>
            <p id="stock-action-message">
              {deleting ? <>Vas a eliminar <strong>{selected.name}</strong> ({selected.sku}) del inventario de este navegador.</>
                : <><strong>{selected.name}</strong> ({selected.sku}). Stock actual: <strong>{selected.stock} {selected.unit}</strong></>}
            </p>
            {!deleting && (
              <QuantityInput label={subtracting ? 'Cantidad a quitar' : 'Cantidad a agregar'} unit={selected.unit}
                min={selected.unit === 'kg' ? 0 : 1} max={subtracting ? selected.stock : undefined} />
            )}
            {actionError && <p className="tw:rounded-xl tw:bg-avocado-salmon-light tw:px-3 tw:py-2" role="alert">{actionError}</p>}
            <div className="tw:flex tw:flex-wrap tw:justify-end tw:gap-2">
              <button className={`${actionButton} tw:border tw:border-avocado-border tw:bg-avocado-surface`} type="button" disabled={saving} onClick={() => dialogRef.current.close()}>Cancelar</button>
              <button className={deleting ? 'inventory-remove' : primaryAction} type="submit" disabled={saving}>{deleting ? 'Eliminar artículo' : title}</button>
            </div>
          </form>
        )}
      </dialog>
    </>
  );
}
