import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Breadcrumbs from './Breadcrumbs';
import NotificationPanel from './NotificationPanel';

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex bg-bg text-white">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Topbar />
      <div className="px-6 pt-2">
        <Breadcrumbs />
      </div>
      <main className="p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      <NotificationPanel />
    </div>
  </div>
);
export default AppShell;
