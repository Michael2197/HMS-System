import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../features/admin/auth.slice';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('access_token', 'dev-token');
    dispatch(
      setUser({
        id: 'u-1',
        name: 'Dev User',
        email: 'dev@example.com',
        role: 'TOP_MANAGEMENT',
        permissions: ['finance.invoice.view','finance.invoice.create','finance.invoice.edit']
      } as any)
    );
    navigate('/dashboard');
  };
  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={submit} className="bg-surface p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4">Sign in</h3>
        <input placeholder="email" className="w-full p-2 rounded-lg mb-3 bg-gray-800" />
        <input placeholder="password" className="w-full p-2 rounded-lg mb-3 bg-gray-800" />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
}
