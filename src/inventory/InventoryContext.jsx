import { createContext, useContext, useEffect, useState } from 'react';
import { addQuantities, initialProducts, previousProductNames, productCategories } from './products.js';

const InventoryContext = createContext(null);
const storagePrefix = 'avocado-inventory:v1:';
const initialBySku = new Map(initialProducts.map((product) => [product.sku, product]));
const deletedRecord = 'null';
const skuPattern = /^[A-Z0-9][A-Z0-9._-]{0,23}$/;

function isValidStock(stock, unit) {
  if (!Number.isFinite(stock) || stock < 0) return false;
  return unit === 'kg' || (unit === 'un.' && Number.isSafeInteger(stock));
}

function withProductLock(key, operation) {
  return navigator.locks ? navigator.locks.request(key, operation) : operation();
}

function readStoredRecord(key, value) {
  const sku = key.slice(storagePrefix.length);
  if (!skuPattern.test(sku)) return null;
  if (value === deletedRecord) return { sku, deleted: true };

  try {
    const product = JSON.parse(value);
    if (product?.sku !== sku || !isValidStock(product.stock, product.unit)) return null;
    const { name, brand, category, stock, unit, reserved = 0 } = product;
    if (![name, brand, category].every((field) => typeof field === 'string' && field.trim())) return null;
    if (!isValidStock(reserved, unit) || !isValidStock(addQuantities(stock, reserved, unit), unit)) return null;
    const symbol = typeof product.symbol === 'string' ? product.symbol : undefined;
    const correctedName = previousProductNames[sku] === name ? initialBySku.get(sku).name : name;
    return { sku, name: correctedName, brand, category, stock, unit, symbol, reserved };
  } catch {
    return null;
  }
}

function loadProducts() {
  try {
    const storage = window.localStorage;
    const records = Object.keys(storage)
      .filter((key) => key.startsWith(storagePrefix))
      .map((key) => readStoredRecord(key, storage.getItem(key)))
      .filter(Boolean);
    const overrides = new Map(records.map((record) => [record.sku, record]));
    return [
      ...initialProducts.map((product) => overrides.get(product.sku) ?? product),
      ...records.filter(({ sku }) => !initialBySku.has(sku)),
    ].filter((record) => !record.deleted);
  } catch {
    return initialProducts;
  }
}

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(loadProducts);
  const categories = productCategories(products);
  const cart = products.filter((product) => product.reserved > 0);

  useEffect(() => {
    function syncProducts(event) {
      if (event.key === null || event.key.startsWith(storagePrefix)) setProducts(loadProducts());
    }

    window.addEventListener('storage', syncProducts);
    return () => window.removeEventListener('storage', syncProducts);
  }, []);

  async function addProduct(values) {
    const sku = values.sku.trim().toUpperCase();
    const name = values.name.trim();
    const brand = values.brand.trim();
    const type = values.category.trim();
    const unit = values.unit;
    const stock = Number(values.stock);

    if (!name || !brand || !type) return { error: 'Completa el nombre, la marca y el tipo de producto.' };
    if (!skuPattern.test(sku)) return { error: 'Ingresa un SKU de 1 a 24 caracteres. Usa letras, números, guiones, puntos o guiones bajos.' };
    if (!values.stock.trim() || !isValidStock(stock, unit)) {
      return { error: 'Ingresa una cantidad válida. Las unidades se registran con números enteros y los kilos pueden tener decimales.' };
    }

    const category = categories.find((existing) => existing.localeCompare(type, 'es-CL', { sensitivity: 'base' }) === 0) ?? type;
    const product = { sku, name, brand, category, stock, unit };
    const key = storagePrefix + sku;

    try {
      return await withProductLock(key, () => {
        const storage = window.localStorage;
        const savedValue = storage.getItem(key);
        const skuInUse = savedValue === null ? initialBySku.has(sku) : savedValue !== deletedRecord;
        if (skuInUse) return { error: `Ya existe un artículo con el SKU ${sku}. Usa un código distinto.` };

        storage.setItem(key, JSON.stringify(product));
        setProducts(loadProducts());
        return { product };
      });
    } catch {
      return { error: 'No se pudo guardar el artículo en este navegador. Revisa si el almacenamiento local está disponible e inténtalo nuevamente.' };
    }

  }

  function changeProduct(product, action, quantity) {
    const { unit, reserved = 0 } = product;
    let updatedProduct = null;

    if (action === 'delete' && reserved > 0) {
      return { error: 'Quita este artículo del carrito antes de eliminarlo del inventario.' };
    }

    if (action !== 'delete') {
      if (quantity <= 0 || !isValidStock(quantity, unit)) {
        return { error: 'Ingresa una cantidad mayor que cero. Para unidades, usa un número entero.' };
      }
      if (action === 'subtract' && quantity > product.stock) {
        return { error: 'La cantidad supera las existencias disponibles.' };
      }
      const difference = action === 'subtract' ? -quantity : quantity;
      const stock = addQuantities(product.stock, difference, unit);
      if (!isValidStock(stock, unit) || !isValidStock(addQuantities(stock, reserved, unit), unit) || stock === product.stock) {
        return { error: 'La cantidad está fuera del rango que se puede registrar.' };
      }
      updatedProduct = { ...product, stock };
    }

    return saveProduct(product, updatedProduct);
  }

  function setCartQuantity(product, quantity) {
    const { unit, stock, reserved = 0 } = product;
    if (!isValidStock(quantity, unit)) return { error: 'Ingresa una cantidad válida para la unidad del artículo.' };
    const difference = addQuantities(quantity, -reserved, unit);
    if (difference > stock) return { error: 'La cantidad solicitada supera el stock disponible.' };
    const available = addQuantities(stock, -difference, unit);
    if (!isValidStock(available, unit) || (difference !== 0 && available === stock)) {
      return { error: 'La cantidad está fuera del rango que se puede registrar.' };
    }

    return saveProduct(product, { ...product, stock: available, reserved: quantity });
  }

  async function saveProduct(product, updatedProduct) {
    const { sku } = product;
    const key = storagePrefix + sku;

    try {
      return await withProductLock(key, () => {
        const storage = window.localStorage;
        const savedValue = storage.getItem(key);
        const storedProduct = savedValue === null ? initialBySku.get(sku) : readStoredRecord(key, savedValue);
        const changed = ['name', 'brand', 'category', 'stock', 'unit']
          .some((field) => storedProduct?.[field] !== product[field])
          || (storedProduct?.reserved ?? 0) !== (product.reserved ?? 0);

        if (changed) {
          setProducts(loadProducts());
          return { error: 'El artículo cambió. Revisa las cantidades e inténtalo nuevamente.' };
        }

        if (updatedProduct) storage.setItem(key, JSON.stringify(updatedProduct));
        else if (initialBySku.has(sku)) storage.setItem(key, deletedRecord);
        else storage.removeItem(key);

        setProducts(loadProducts());
        return { product: updatedProduct };
      });
    } catch {
      return { error: 'No se pudo guardar el cambio en este navegador. Inténtalo nuevamente.' };
    }
  }

  return <InventoryContext value={{ products, categories, cart, addProduct, changeProduct, setCartQuantity }}>{children}</InventoryContext>;
}

export function useInventory() {
  return useContext(InventoryContext);
}
