export const initialProducts = [
  { sku: 'FRU-001', name: 'Palta Hass', brand: 'Sin marca', category: 'Frutas y verduras', stock: 32, unit: 'kg', symbol: '🥑' },
  { sku: 'LAC-001', name: 'Leche entera · 1 L', brand: 'Sin especificar', category: 'Lácteos', stock: 24, unit: 'un.', symbol: '🥛' },
  { sku: 'ABA-001', name: 'Arroz de grado 1 · 1 kg', brand: 'Sin especificar', category: 'Abarrotes', stock: 8, unit: 'un.', symbol: '🍚' },
  { sku: 'FRU-002', name: 'Tomate', brand: 'Sin marca', category: 'Frutas y verduras', stock: 5, unit: 'kg', symbol: '🍅' },
  { sku: 'PAN-001', name: 'Pan integral · 500 g', brand: 'Sin especificar', category: 'Panadería', stock: 0, unit: 'un.', symbol: '🍞' },
  { sku: 'LAC-002', name: 'Yogur natural · 125 g', brand: 'Sin especificar', category: 'Lácteos', stock: 18, unit: 'un.', symbol: '🥣' },
  { sku: 'FRU-003', name: 'Manzana Fuji', brand: 'Sin marca', category: 'Frutas y verduras', stock: 21, unit: 'kg', symbol: '🍎' },
  { sku: 'PAN-002', name: 'Marraqueta', brand: 'Sin marca', category: 'Panadería', stock: 6, unit: 'un.', symbol: '🥖' },
  { sku: 'BEB-001', name: 'Jugo de naranja · 1 L', brand: 'Sin especificar', category: 'Bebidas', stock: 15, unit: 'un.', symbol: '🧃' },
  { sku: 'SNA-001', name: 'Galletas de avena · 150 g', brand: 'Sin especificar', category: 'Snacks y confitería', stock: 12, unit: 'un.', symbol: '🍪' },
];

export const previousProductNames = {
  'LAC-001': 'Leche entera 1 L',
  'ABA-001': 'Arroz grado 1 · 1 kg',
  'PAN-001': 'Pan integral 500 g',
  'LAC-002': 'Yogur natural 125 g',
  'BEB-001': 'Jugo de naranja 1 L',
  'SNA-001': 'Galletas de avena 150 g',
};

export const lowStockLimit = 10;

export const statusLabels = { available: 'Disponible', low: 'Stock bajo', empty: 'Agotado' };

export function stockStatus(stock) {
  if (stock === 0) return 'empty';
  return stock < lowStockLimit ? 'low' : 'available';
}

export function productCategories(products) {
  return [...new Set(products.map(({ category }) => category))].sort((a, b) => a.localeCompare(b, 'es-CL'));
}

export function filterProducts(products, category, search, includeBrand) {
  const term = normalizeSearch(search);
  return products.filter((product) => {
    const fields = includeBrand ? [product.name, product.sku, product.brand] : [product.name, product.sku];
    return (!category || product.category === category)
      && normalizeSearch(fields.join(' ')).includes(term);
  });
}

function normalizeSearch(value) {
  return value.toLocaleLowerCase('es-CL').normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replaceAll('·', ' ').replace(/\s+/g, ' ').trim();
}

export function addQuantities(first, second, unit) {
  const sum = first + second;
  if (unit !== 'kg') return sum;
  const places = Math.max(decimalPlaces(first), decimalPlaces(second));
  return places <= 100 ? Number(sum.toFixed(places)) : sum;
}

function decimalPlaces(number) {
  const [digits, exponent = '0'] = String(number).split('e');
  return Math.max(0, (digits.split('.')[1]?.length ?? 0) - Number(exponent));
}
