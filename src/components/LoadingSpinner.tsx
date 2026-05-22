import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZE_CLASSES: Record<NonNullable<LoadingSpinnerProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
};

// ─── Component ────────────────────────────────────────────────────────────────

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', message }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-12">
    <div
      className={`${SIZE_CLASSES[size]} animate-spin rounded-full border-blue-600 border-t-transparent`}
      role="status"
      aria-label="Loading"
    />
    {message && <p className="text-sm text-gray-500">{message}</p>}
  </div>
);

export default LoadingSpinner;
