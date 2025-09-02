import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);
  const crumbs = parts.map((p, idx) => {
    const to = '/' + parts.slice(0, idx + 1).join('/');
    return { label: p.replace(/-/g, ' '), to };
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs text-gray-400">
        <li><Link to="/" className="hover:text-white">home</Link></li>
        {crumbs.map((c, i) => (
          <li key={c.to} className="flex items-center gap-2">
            <span>/</span>
            {i < crumbs.length - 1 ? (
              <Link to={c.to} className="hover:text-white">{c.label}</Link>
            ) : (
              <span className="text-gray-300">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumbs;
