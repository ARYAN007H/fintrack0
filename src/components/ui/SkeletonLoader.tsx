import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  count?: number;
}

export const SkeletonCard: React.FC<SkeletonLoaderProps> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse ${className}`}>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
    </div>
  </div>
);

export const SkeletonTransaction: React.FC<SkeletonLoaderProps> = ({ className = '' }) => (
  <div className={`flex items-center justify-between px-6 py-4 animate-pulse ${className}`}>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
  </div>
);

export const SkeletonChart: React.FC<SkeletonLoaderProps> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse ${className}`}>
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
      <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

export const SkeletonList: React.FC<SkeletonLoaderProps> = ({ count = 5, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonTransaction key={index} />
    ))}
  </div>
);