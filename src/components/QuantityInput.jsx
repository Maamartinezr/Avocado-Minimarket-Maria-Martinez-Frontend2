export default function QuantityInput({ label, unit, min, max, defaultValue }) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <input className="form-control" name="quantity" type="number" required min={min} max={max}
        step={unit === 'kg' ? 'any' : 1} defaultValue={defaultValue} />
    </label>
  );
}
