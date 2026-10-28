import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-3 text-gray-400">{leftIcon}</div>
        )}
        {rightIcon && (
          <div className="absolute right-3 top-3 text-gray-400">{rightIcon}</div>
        )}
        <input
          className={[
            'block w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200',
            leftIcon ? 'pl-11' : 'pl-4',
            rightIcon ? 'pr-11' : 'pr-4',
            error
              ? 'border-destructive focus:ring-destructive-500 focus:border-destructive-500'
              : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500',
            className,
          ].filter(Boolean).join(' ')}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {helperText && !error && <p className="text-xs text-gray-400">{helperText}</p>}
    </div>
  )
}