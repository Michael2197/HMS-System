import React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'ghost' };
export default function Button({ children, className = '', variant = 'primary', ...rest }: Props) {
  const variants: Record<string, string> = {
    primary: 'bg-primary text-black',
    secondary: 'bg-secondary text-white',
    ghost: 'bg-transparent border border-gray-700 text-gray-200'
  };
  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-1 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
