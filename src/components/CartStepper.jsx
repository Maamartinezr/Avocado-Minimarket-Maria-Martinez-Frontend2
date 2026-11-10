import { Icon } from './Icons.jsx';
import { addQuantities } from '../inventory/products.js';

export default function CartStepper({ product, onChange, disabled, showQuantity = false, showAddButton = false }) {
  const { name, unit, stock, reserved = 0 } = product;
  const firstAddition = showAddButton && reserved === 0;

  return (
    <div className="inventory-action-group tw:items-center" role="group" aria-label={`Cantidad de ${name} en el carrito`}>
      {!firstAddition && <button className="inventory-row-button" type="button" disabled={disabled || reserved === 0}
        aria-label={`Disminuir cantidad de ${name}`} onClick={() => onChange(addQuantities(reserved, -Math.min(1, reserved), unit))}>
        <Icon name="minus" />
      </button>}
      {showQuantity && !firstAddition && <span className="catalog-quantity">{reserved} {unit}</span>}
      <button className={firstAddition ? 'about-button' : 'inventory-row-button action-add'} type="button" disabled={disabled || stock === 0}
        aria-label={firstAddition ? `Agregar ${name} al carrito` : `Aumentar cantidad de ${name}`}
        onClick={() => onChange(addQuantities(reserved, Math.min(1, stock), unit))}>
        <Icon name={firstAddition ? 'cart' : 'plus'} /> {firstAddition && 'Agregar al carrito'}
      </button>
    </div>
  );
}
