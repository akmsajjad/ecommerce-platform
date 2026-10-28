import * as React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'destructive' | 'outline' | 'secondary'
  size?: 'sm' | 'md'
}

export function Badge({ className, variant = 'primary', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-primary-50 text-primary-700 border border-primary-100',
    success: 'bg-success-50 text-success-700 border border-success-100',
    warning: 'bg-warning-50 text-warning-700 border border-warning-100',
    destructive: 'bg-destructive-50 text-destructive-700 border border-destructive-100',
    outline: 'border border-gray-200 text-gray-600 bg-transparent',
    secondary: 'bg-gray-100 text-gray-700',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  }

  return (
    <span
      className={[
        'inline-flex items-center rounded-full border font-medium transition-colors duration-200',
        variants[variant],
        sizes[size],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}