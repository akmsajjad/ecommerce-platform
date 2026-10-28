import * as React from 'react'

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  const backdrop = open ? 'fixed inset-0 z-50 bg-black/80 backdrop-blur-sm' : 'hidden'
  const content = open ? 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-lg' : 'hidden'

  return (
    <>
      <div className={backdrop} onClick={() => onOpenChange(false)} />
      <div className={content}>{children}</div>
    </>
  )
}