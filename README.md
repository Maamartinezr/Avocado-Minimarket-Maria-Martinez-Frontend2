# Avocado MiniMarket

Avocado MiniMarket es un sitio web de gestión de inventario y consulta de productos desarrollado en tres etapas para la asignatura Frontend II. El sitio reúne un catálogo para clientes, un carrito de compras y un panel para administrar las existencias del minimarket.

## Funcionalidades actuales

- **Catálogo.** Desde Inicio se pueden buscar productos por nombre, marca o SKU, filtrar por categoría y agregar, aumentar, disminuir o retirar productos del carrito. El nombre de cada producto abre su ficha.
- **Ficha del producto.** Muestra el SKU, la marca, el tipo, las existencias disponibles y el estado. Permite elegir una cantidad antes de agregarla al carrito.
- **Carrito.** Muestra las cantidades reservadas y permite modificarlas o devolverlas al inventario. El resumen lateral incluye el botón informativo **Proceder al pago** y el aviso «Función no disponible por el momento».
- **Panel de inventario.** Reúne el resumen de existencias, la tabla completa, la búsqueda y el filtro por categoría. Desde la tabla se puede agregar o quitar stock y eliminar un artículo previa confirmación.
- **Alta de artículos.** El formulario registra nombre, marca, tipo, SKU, existencias iniciales y unidad de medida. Valida los campos, las cantidades y los SKU duplicados.
- **Información del minimarket.** Incluye sucursales, datos de contacto, preguntas frecuentes, guía de compra, condiciones de despacho y retiro en tienda. El formulario de contacto prepara un borrador para enviar desde una aplicación de correo.

La navegación superior reúne **Inicio, Catálogo, Quiénes somos, Preguntas frecuentes y Carrito**. La barra inferior, en verde oliva y salmón, reúne **Panel de inventario** y **Agregar artículo**. El diseño combina la paleta de la marca, fondos amarillo crema y tipografía Montserrat.

## Evolución del proyecto

### Parte 1 — Utilizando tecnologías avanzadas de React en sitios web

La primera versión estableció la estructura del frontend con React, JavaScript, HTML y CSS. Se crearon tres pantallas. **Inicio** mostraba el resumen y la tabla del inventario, **Quiénes somos** reunía Nuestras tiendas, Contáctanos y Cómo comprar, y **Preguntas frecuentes** organizaba las consultas en respuestas desplegables.

Se configuró React Router para navegar entre las pantallas sin recargar el sitio y destacar el enlace activo del menú inferior. Esta etapa dejó la base de navegación, el catálogo inicial y los estilos que se ampliaron en las etapas siguientes.

### Parte 2 — Implementando gestión de estado en componentes frontend con React

Se agregaron las pantallas **Agregar artículo** y **Listado de artículos**. La colección dejó de depender de los datos de una sola pantalla y pasó a un estado global con React Context y `useState`. El formulario registra nombre, marca, tipo de producto y datos de stock, y el listado refleja los cambios en cuanto se guarda un artículo.

Se integró Tailwind CSS para diseñar el menú, los formularios y las pantallas de gestión. En las mejoras de esta etapa también se incorporaron las acciones para sumar o restar existencias y eliminar registros con confirmación. Los cambios se guardan en el navegador y se recuperan al recargar.

### Parte 3 — Desarrollando sitios web con React avanzado

La búsqueda y el filtro por categoría se consolidaron en una función que calcula la vista a partir del estado global. Volver a **Todas las categorías** recupera el conjunto completo. Se añadió una ruta de detalle por SKU y un carrito que comparte el mismo inventario.

Agregar o aumentar una cantidad en el carrito descuenta existencias disponibles. Reducir la cantidad o retirar el producto las devuelve. La interfaz limita las reservas al stock disponible y admite cantidades enteras para unidades y decimales para kilogramos.

Después se reorganizó la experiencia de uso. **Inicio** pasó a mostrar el catálogo y sus controles de compra. El listado de gestión se convirtió en **Panel de inventario**. Se separaron ambos recorridos en los menús superior e inferior y se incorporaron las secciones de despachos en Inicio y el resumen lateral del carrito.

## Pantallas y rutas

| Ruta | Pantalla o sección | Uso |
| --- | --- | --- |
| `/` | Inicio | Portada, catálogo y secciones de despachos. |
| `/#catalogo` | Catálogo | Acceso directo a las tarjetas de productos y los controles del carrito. |
| `/#despachos` | Despachos | Acceso directo a cobertura, tarifas, plazos y retiro. |
| `/quienes-somos` | Quiénes somos | Misión, visión, valores, sucursales, contacto, guía de compra y despachos. |
| `/preguntas-frecuentes` | Preguntas frecuentes | Respuestas sobre disponibilidad, tiendas, compras y entregas. |
| `/inventario/agregar` | Agregar artículo | Formulario de alta con validación de campos y SKU. |
| `/inventario/articulos` | Panel de inventario | Resumen, tabla, filtros y acciones para administrar existencias. |
| `/inventario/articulos/:sku` | Detalle del artículo | Ficha del producto y selección de cantidad para el carrito. |
| `/carrito` | Carrito de compras | Productos reservados, ajustes de cantidad y resumen. |

## Tecnologías

| Tecnología | Uso en el proyecto |
| --- | --- |
| React y JavaScript | Pantallas, componentes, formularios y estado compartido. |
| React Router | Navegación entre pantallas, rutas dinámicas por SKU y enlaces de sección. |
| Tailwind CSS | Cuadrículas adaptables, controles y distribución visual con utilidades `tw:`. |
| Bootstrap 5 y CSS propio | Tablas, campos de formulario y estilos de marca. |
| Vite y pnpm | Servidor de desarrollo, compilación e instalación reproducible de dependencias. |
| Git | Historial de versiones y preparación de la entrega. |

## Estructura del proyecto

```text
Frontend II/
├── .gitignore
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── vite.config.js
└── src/
    ├── App.jsx                        # Rutas y menús del sitio
    ├── main.jsx                       # Entrada de React, Router y proveedor global
    ├── styles.css                     # Paleta, tipografía y estilos propios
    ├── tailwind.css                   # Utilidades y colores de marca de Tailwind
    ├── assets/
    │   ├── avocado-minimarket-logo.png # Logotipo de la marca
    │   └── canasta-mercado.webp       # Fotografía de la portada
    ├── components/
    │   ├── CartStepper.jsx            # Botones para aumentar o reducir una cantidad
    │   ├── Catalog.jsx                # Tarjetas, búsqueda y filtro del catálogo
    │   ├── DeliveryInformation.jsx    # Despachos y Compra con nosotros
    │   ├── Icons.jsx                  # Íconos SVG
    │   ├── InventoryList.jsx          # Tabla, filtros y acciones del panel
    │   ├── ProductSymbol.jsx          # Símbolo reutilizable de producto
    │   ├── QuantityInput.jsx          # Campo para unidades o kilogramos
    │   └── SectionTitle.jsx           # Encabezado de sección con ícono
    ├── inventory/
    │   ├── InventoryContext.jsx       # Estado global, operaciones y persistencia
    │   ├── products.js                # Inventario inicial y funciones de consulta
    │   └── routes.js                  # Rutas del catálogo, inventario y carrito
    └── pages/
        ├── About.jsx                  # Quiénes somos y contacto
        ├── Home.jsx                   # Portada, catálogo y despachos
        ├── Information.jsx            # Preguntas frecuentes
        ├── Inventory.jsx              # Alta y panel de inventario
        └── Shopping.jsx               # Detalle, carrito y resumen de pago
```

## Estado y persistencia

El proyecto parte con diez artículos definidos en `src/inventory/products.js`. Cada registro contiene un SKU único, nombre, marca, categoría, existencias disponibles y unidad de medida. Los productos del carrito incorporan una cantidad reservada.

El proveedor `InventoryProvider` comparte los datos entre el catálogo, el detalle, el carrito y el panel. `filterProducts` devuelve una selección a partir de la categoría y del término de búsqueda. El estado original del inventario se conserva al filtrar.

Los cambios de cada SKU se guardan en `localStorage`. Al ajustar el carrito, el stock disponible y la cantidad reservada se actualizan en el mismo registro. Por ejemplo, si quedan 32 kg disponibles y se reservan 2 kg, el registro pasa a 30 kg disponibles y 2 kg en el carrito. Retirar esos 2 kg devuelve el total disponible a 32 kg. La persistencia se aplica al navegador y a la dirección donde se usa el sitio.

## Instalación y ejecución

Se requiere **Node.js 22.12 o posterior** y **pnpm 11**. Ejecuta los siguientes comandos desde la carpeta raíz del proyecto.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Abre la dirección **Local** que muestra Vite, normalmente `http://localhost:5173/`. Mantén la terminal abierta mientras uses el sitio.

Usa estos comandos para compilar y revisar la versión de producción.

```bash
pnpm build
pnpm preview
```

La compilación queda en `dist/`. En un servidor de alojamiento, las rutas del frontend deben apuntar a `index.html` para que React Router pueda resolverlas al abrir o recargar un enlace directo.

## Comprobación manual

1. Recorre el menú superior y comprueba el acceso a Quiénes somos, Preguntas frecuentes y Carrito. Abre el Panel de inventario desde el menú inferior.
2. Filtra la tabla por **Bebidas** y vuelve a **Todas las categorías**. Comprueba que se recupera el listado completo.
3. Abre la ficha de un producto, agrega una cantidad al carrito y revisa el descuento en el panel. Aumenta y disminuye la cantidad desde el carrito. Retira el producto y comprueba que las unidades o kilos reservados vuelven al inventario.
4. Agrega un artículo con un SKU de prueba. Verifica que aparezca en el panel, que se conserve al recargar y que el formulario rechace otro artículo con el mismo SKU.
5. Ajusta el stock del artículo de prueba y comprueba el límite de retiro. Abre la confirmación para eliminarlo, cancela y comprueba que siga en la tabla. Luego confirma el borrado del artículo de prueba y recarga.
6. Abre el carrito y enfoca **Proceder al pago** con el teclado o pasa el cursor por encima. Debe aparecer «Función no disponible por el momento».

## Autoría

**Maria Alejandra Martinez Reverol** · Frontend II
