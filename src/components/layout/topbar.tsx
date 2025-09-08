import React from 'react';
import { useAppSelector } from '../../store/hooks';
const Topbar: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <header className="h-16 flex items-center justify-end px-6 border-b border-gray-800">
      <div className="text-sm text-gray-300">{user?.name ?? 'Guest'}</div>
    </header>
  );
};
export default Topbar;
