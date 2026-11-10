import { useEffect, useRef } from 'react';
import { Link, NavLink, Route, Routes, matchPath, useLocation } from 'react-router';
import logo from './assets/avocado-minimarket-logo.png';
import { Icon } from './components/Icons.jsx';
import { useInventory } from './inventory/InventoryContext.jsx';
import { addArticlePath, articleDetailPattern, articlesPath, cartPath, catalogPath } from './inventory/routes.js';
import About from './pages/About.jsx';
import Home from './pages/Home.jsx';
import { Faq } from './pages/Information.jsx';
import { AddArticle, InventoryPanel } from './pages/Inventory.jsx';
import { ArticleDetail, Cart } from './pages/Shopping.jsx';

const customerPages = [
  { path: '/', label: 'Inicio', component: Home },
  { path: '/quienes-somos', label: 'Quiénes somos', component: About },
  { path: '/preguntas-frecuentes', label: 'Preguntas frecuentes', component: Faq },
  { path: cartPath, label: 'Carrito', icon: 'cart', component: Cart },
];

const inventoryPages = [
  { path: articlesPath, label: 'Panel de inventario', icon: 'box', component: InventoryPanel },
  { path: addArticlePath, label: 'Agregar artículo', icon: 'plus', component: AddArticle },
];

const topLinks = [customerPages[0], { path: catalogPath, label: 'Catálogo' }, ...customerPages.slice(1)];
const routes = [...customerPages, ...inventoryPages, { path: articleDetailPattern, label: 'Detalle del artículo', component: ArticleDetail }];

function NotFound() {
  return (
    <section className="page-intro">
      <p className="eyebrow">ERROR 404</p>
      <h1>Página no encontrada</h1>
      <p>Revisa la dirección o vuelve al panel de inventario.</p>
      <Link className="action-link" to="/">Volver al inicio <Icon name="arrow" /></Link>
    </section>
  );
}

export default function App() {
  const { pathname, hash, key } = useLocation();
  const { cart } = useInventory();
  const catalogSelected = pathname === '/' && (hash === '#catalogo' || hash === '#inventario');
  const previousKey = useRef(key);
  const mainRef = useRef(null);

  useEffect(() => {
    const currentPath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
    const page = routes.find(({ path }) => matchPath(path, currentPath));
    document.title = `${catalogSelected ? 'Catálogo' : page?.label ?? 'Página no encontrada'} | Avocado MiniMarket`;

    const targetId = catalogSelected ? 'catalogo' : hash.slice(1);
    const target = targetId && document.getElementById(targetId);
    if (target) {
      target.scrollIntoView();
      target.focus({ preventScroll: true });
    } else if (previousKey.current !== key) {
      window.scrollTo(0, 0);
      mainRef.current?.focus({ preventScroll: true });
    }
    previousKey.current = key;
  }, [pathname, hash, key, catalogSelected]);

  return (
    <>
      <a className="skip-link" href="#contenido">Ir al contenido</a>
      <header className="topbar">
        <div className="shell topbar-inner">
          <Link className="brand" to="/">
            <img src={logo} alt="Avocado MiniMarket, inicio" width="1672" height="941" />
          </Link>
          <nav className="customer-nav tw:flex tw:flex-wrap tw:items-center tw:gap-2" aria-label="Navegación principal">
            {topLinks.map(({ path, label, icon }) => {
              const active = path === catalogPath ? catalogSelected : matchPath(path, pathname) && !catalogSelected;
              return (
                <Link className="tw:inline-flex tw:min-h-11 tw:items-center tw:gap-1.5 tw:rounded-full tw:px-3 tw:py-2 tw:text-sm tw:font-bold tw:hover:bg-avocado-sun tw:aria-[current=page]:bg-avocado-lime"
                  to={path} aria-current={active ? 'page' : undefined} key={path}>
                  {icon && <Icon name={icon} />}<span>{label}</span>
                  {path === cartPath && <span className="cart-count">{cart.length}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="shell main" id="contenido" ref={mainRef} tabIndex={-1}>
        <Routes>
          {routes.map(({ path, component: Page }) => (
            <Route key={path} path={path} element={<Page />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bottom-bar">
        <nav className="bottom-nav" aria-label="Menú de gestión de inventario">
          {inventoryPages.map(({ path, label, icon }) => (
            <NavLink className={path === addArticlePath ? 'bottom-add' : undefined} to={path} end key={path}>
              <Icon name={icon} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </footer>
    </>
  );
}
