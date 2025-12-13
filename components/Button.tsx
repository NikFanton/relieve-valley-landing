import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-cartoon font-bold rounded-xl transition-all active:translate-y-1 active:shadow-none border-2 border-brand-dark shadow-cartoon flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-red-400",
    secondary: "bg-brand-blue text-white hover:bg-blue-400",
    accent: "bg-brand-green text-brand-dark hover:bg-teal-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};