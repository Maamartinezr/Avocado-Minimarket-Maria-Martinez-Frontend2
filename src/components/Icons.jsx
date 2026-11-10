const icons = {
  home: <><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 21v-7h6v7" /></>,
  store: <><path d="M4 12v9h16v-9M3 8l2-5h14l2 5v2a2 2 0 0 1-4 0 2 2 0 0 1-5 0 2 2 0 0 1-5 0 2 2 0 0 1-4 0z" /><path d="M3 8h18m-7 13v-6h-4v6" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 4 2c-1 .7-1.5 1-1.5 2.5m0 3h.01" /></>,
  box: <><path d="m12 3 9 4.5v9L12 21l-9-4.5v-9L12 3Zm0 9 9-4.5M12 12 3 7.5M12 12v9m-4.5-15.75 9 4.5" /></>,
  check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  alert: <><path d="M10.3 4.4a2 2 0 0 1 3.4 0l7 12.2A2 2 0 0 1 19 19.5H5a2 2 0 0 1-1.7-2.9z" /><path d="M12 9v3.5m0 3.5h.01" /></>,
  search: <><circle cx="10.5" cy="10.5" r="5.5" /><path d="m15 15 4.5 4.5" /></>,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  bag: <><path d="M5 8h14l1 13H4zM9 9V6a3 3 0 0 1 6 0v3" /></>,
  cart: <><path d="M3 4h2l2.5 12h11l2-8H6" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>,
  truck: <><path d="M3 6h11v12H3zM14 10h4l3 4v4h-7" /><circle cx="7" cy="18" r="2" fill="currentColor" /><circle cx="17" cy="18" r="2" fill="currentColor" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: <path d="M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" />,
};

export function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}
