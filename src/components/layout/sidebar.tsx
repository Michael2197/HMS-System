import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { MODULE_ROLES } from '../../app/rbac';

const items = [
  { to: '/dashboard', label: 'Dashboard', moduleKey: 'reporting' },
  { to: '/finance/invoices', label: 'Invoices', moduleKey: 'finance' },
  { to: '/hr/employees', label: 'Employees', moduleKey: 'hr' },
  { to: '/inventory/products', label: 'Products', moduleKey: 'inventory' },
  { to: '/husbandry/livestock', label: 'Livestock', moduleKey: 'husbandry' },
  { to: '/projects', label: 'Projects', moduleKey: 'projects' }
];

const Sidebar: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <aside className="w-64 bg-surface p-4 text-sm">
      <div className="mb-6 text-lg font-semibold">ERP</div>
      <nav className="flex flex-col space-y-1">
        {items.map((it) => {
          const allowed =
            !it.moduleKey ||
            MODULE_ROLES[it.moduleKey]?.includes(user?.role as any) ||
            user?.role === 'TOP_MANAGEMENT';
          if (!allowed) return null;
          return (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-xl ${isActive ? 'bg-primary text-black' : 'hover:bg-gray-800'}`
              }
            >
              {it.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
export default Sidebar;
