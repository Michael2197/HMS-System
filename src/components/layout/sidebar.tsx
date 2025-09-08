import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { MODULE_ROLES } from '../../app/rbac';

interface NavItem {
  to?: string;
  label: string;
  moduleKey?: string;
  children?: NavItem[];
}

const items: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', moduleKey: 'reporting' },
  { to: '/finance/overview', label: 'Finance', moduleKey: 'finance' },
  { to: '/sales/overview', label: 'Sales', moduleKey: 'sales' },
  { to: '/marketing/overview', label: 'Marketing', moduleKey: 'marketing' },
  { to: '/procurement/overview', label: 'Procurement', moduleKey: 'procurement' },
  { to: '/husbandry/overview', label: 'Husbandry', moduleKey: 'husbandry' },
  {
    label: 'HR',
    moduleKey: 'hr',
    children: [
      { to: '/hr/employees', label: 'Employees' },
      { to: '/hr/attendance', label: 'Attendance' },
      { to: '/hr/payroll', label: 'Payroll' },
      { to: '/hr/recruitment', label: 'Recruitment' },
      { to: '/hr/performance', label: 'Performance' },
      { to: '/hr/learning', label: 'Learning' },
      { to: '/hr/leave', label: 'Leave' },
      { to: '/hr/analytics', label: 'Analytics' },
    ],
  },
  { to: '/inventory/products', label: 'Products', moduleKey: 'inventory' },
  { to: '/projects', label: 'Projects', moduleKey: 'projects' }
];

const Sidebar: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownClick = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

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
          if (it.children) {
            return (
              <div key={it.label} className="relative">
                <button
                  className="flex w-full items-center justify-between rounded-xl px-3 py-2 hover:bg-gray-800 focus:outline-none"
                  onClick={() => handleDropdownClick(it.label)}
                >
                  {it.label}
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${openDropdown === it.label ? 
                      'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {openDropdown === it.label && (
                  <nav className="mt-2 flex flex-col space-y-1 pl-4">
                    {it.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        `block rounded-xl px-3 py-2 ${isActive ? 'bg-primary text-black' : 'hover:bg-gray-800'}`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            );
          }
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
