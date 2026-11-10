import { Icon } from './Icons.jsx';

export default function SectionTitle({ icon, id, children }) {
  return (
    <div className="section-title">
      <span className="icon-tile green"><Icon name={icon} /></span>
      <h2 id={id}>{children}</h2>
    </div>
  );
}
