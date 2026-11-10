import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import { InventoryProvider } from './inventory/InventoryContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource-variable/montserrat';
import '@fontsource-variable/montserrat/wght-italic.css';
import './tailwind.css';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </BrowserRouter>
  </StrictMode>,
);
