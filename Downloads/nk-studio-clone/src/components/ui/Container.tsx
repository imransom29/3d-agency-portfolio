import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

export default function Container({ children, className = '', fluid = false }: ContainerProps) {
  return (
    <div className={`${fluid ? 'w-full' : 'container mx-auto px-4 md:px-6 lg:px-8'} ${className}`}>
      {children}
    </div>
  );
}
