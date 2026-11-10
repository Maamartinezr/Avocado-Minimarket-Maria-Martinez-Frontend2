import { Icon } from './Icons.jsx';

export default function ProductSymbol({ symbol }) {
  return <span className="product-symbol" aria-hidden="true">{symbol || <Icon name="box" />}</span>;
}
