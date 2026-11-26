import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
}

/**
 * Zero-Broken-Image component: renders high-fidelity local imagery with
 * referrerPolicy="no-referrer" and a styled architectural fallback if loading fails.
 */
export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackClassName = 'bg-[#000A73] text-white',
  fallbackLabel,
  loading = 'lazy',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full flex items-center justify-center p-6 text-center ${fallbackClassName}`}
      >
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-75">
            SOATVELASQUEZ.COM
          </p>
          <p className="text-sm font-semibold">{fallbackLabel ?? alt}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
