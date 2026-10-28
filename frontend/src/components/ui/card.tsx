import * as React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={['rounded-xl border bg-white text-foreground shadow-sm', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  title?: string
  description?: string
}

export function CardHeader({ className, title, description, children }: CardHeaderProps) {
  return (
    <div className={['flex flex-col space-y-1.5 p-6', className].filter(Boolean).join(' ')}>
      {title && <h2 className="text-2xl font-semibold leading-none tracking-tight">{title}</h2>}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
    </div>
  )
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export function CardTitle({ className, children }: CardTitleProps) {
  return <h2 className={['text-2xl font-semibold leading-none tracking-tight', className].filter(Boolean).join(' ')}>{children}</h2>
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

export function CardDescription({ className, children }: CardDescriptionProps) {
  return <p className={['text-sm text-muted-foreground', className].filter(Boolean).join(' ')}>{children}</p>
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={['p-6 pt-0', className].filter(Boolean).join(' ')}>{children}</div>
  )
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={['flex items-center p-6 pt-0', className].filter(Boolean).join(' ')}>{children}</div>
  )
}