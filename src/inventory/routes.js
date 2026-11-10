export const addArticlePath = '/inventario/agregar';
export const articlesPath = '/inventario/articulos';
export const articleDetailPattern = `${articlesPath}/:sku`;
export const cartPath = '/carrito';
export const catalogPath = '/#catalogo';

export function articleDetailPath(sku) {
  return `${articlesPath}/${encodeURIComponent(sku)}`;
}
