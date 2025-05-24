import React from 'react';

export const ChessIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M8 16l-1.447.724a1 1 0 0 0-.553.894V20h12v-2.382a1 1 0 0 0-.553-.894L16 16" />
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v3" />
      <path d="M10 9h4" />
      <path d="M9 17v-5.5a1 1 0 0 1 2 0" />
      <path d="M15 17v-5.5a1 1 0 0 0-2 0" />
      <path d="M9 11h6" />
    </svg>
  );
};

export const StarIcon: React.FC<{ className?: string, filled?: boolean }> = ({ className, filled = false }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};