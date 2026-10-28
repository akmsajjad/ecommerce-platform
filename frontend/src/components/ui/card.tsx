import * as React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ className, children, hover = true, padding = 'md' }: CardProps) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div
      className={[
        'bg-white rounded-xl border border-gray-100 transition-all duration-300',
        hover && 'hover:shadow-xl hover:-translate-y-1 hover:border-gray-200',
        paddings[padding],
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  className?: string
}

export function CardHeader({ className, title, subtitle, children }: CardHeaderProps) {
  return (
    <div className={['mb-4', className].filter(Boolean).join(' ')}>
      {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      {children}
    </div>
  )
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export function CardTitle({ className, children }: CardTitleProps) {
  return <h3 className={['text-lg font-semibold text-gray-900', className].filter(Boolean).join(' ')}>{children}</h3>
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

export function CardDescription({ className, children }: CardDescriptionProps) {
  return <p className={['text-sm text-gray-500', className].filter(Boolean).join(' ')}>{children}</p>
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={className}>{children}</div>
  )
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={['flex items-center justify-between pt-6 border-t border-gray-100', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}