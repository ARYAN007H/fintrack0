import React from 'react';
import clsx from 'clsx';
import LoadingSpinner from './LoadingSpinner';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  'aria-label'?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  ...props
}: ButtonProps) {
  const base = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 relative';
  
  const variants = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500 hover:shadow-md disabled:hover:bg-purple-600 hover:scale-105 active:scale-95',
    secondary: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-gray-400 hover:shadow-sm hover:scale-105 active:scale-95',
    destructive: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 hover:shadow-md disabled:hover:bg-red-600 hover:scale-105 active:scale-95',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-gray-400 hover:scale-105 active:scale-95',
    link: 'text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 focus:ring-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105 active:scale-95'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-sm min-h-[44px] sm:px-6 sm:py-3',
    lg: 'px-6 py-3 text-base min-h-[48px] sm:px-8 sm:py-4'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && (
        <LoadingSpinner size="sm" className="absolute" />
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
}