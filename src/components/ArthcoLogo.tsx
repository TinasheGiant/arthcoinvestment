import React from 'react';

interface ArthcoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  showMotto?: boolean;
  textColor?: string;
  mottoColor?: string;
}

export const ArthcoLogo: React.FC<ArthcoLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showMotto = true,
  textColor = 'text-white',
  mottoColor = 'text-[#E2C08D]'
}) => {
  const sizeMap = {
    sm: { badge: 'w-8 h-8', text: 'text-sm', motto: 'text-[10px]' },
    md: { badge: 'w-10 h-10', text: 'text-base', motto: 'text-[11px]' },
    lg: { badge: 'w-14 h-14', text: 'text-xl', motto: 'text-xs' },
    xl: { badge: 'w-20 h-20', text: 'text-2xl', motto: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Official Arthco Badge Icon */}
      <div className={`relative ${currentSize.badge} shrink-0 rounded-lg overflow-hidden shadow-sm border border-white/20 bg-white p-0.5`}>
        <img
          src="/logo.svg"
          alt="Arthco Timbers Logo"
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback to PNG if SVG encounters any issue
            (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
          }}
        />
      </div>

      {/* Brand Text & Motto */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center space-x-1.5">
            <span className={`font-extrabold tracking-tight ${textColor} ${currentSize.text}`}>
              Arthco <span className="text-[#C28846]">Timbers</span>
            </span>
          </div>
          {showMotto && (
            <span className={`font-medium italic tracking-wide lowercase ${mottoColor} ${currentSize.motto}`}>
              for your quality timber
            </span>
          )}
        </div>
      )}
    </div>
  );
};
