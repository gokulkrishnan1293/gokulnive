import type { ReactNode } from 'react'

// Shared layout pieces for the product sections.

interface ProductSectionProps {
  id: string
  titleId: string
  focused: boolean
  children: ReactNode
}

export function ProductSection({ id, titleId, focused, children }: ProductSectionProps) {
  return (
    <section id={id} aria-labelledby={titleId} className="border-t border-line py-[72px] lg:py-24" data-focused={focused}>
      <div className="wrap">{children}</div>
    </section>
  )
}

interface ProductHeadProps {
  focused: boolean
  chip: ReactNode
  title: string
  titleId: string
  lede: string
  actions: ReactNode
  visual: ReactNode
}

export function ProductHead({ focused, chip, title, titleId, lede, actions, visual }: ProductHeadProps) {
  return (
    <div
      className={`-m-2 grid items-center gap-11 rounded-2xl p-2 lg:grid-cols-[1fr_1.05fr] lg:gap-16 ${
        focused ? 'animate-flash' : ''
      }`}
    >
      <div>
        {chip}
        <h2 id={titleId} className="mt-[18px] text-[clamp(2.3rem,4.4vw,3.8rem)] font-bold tracking-[-0.04em]">
          {title}
        </h2>
        <p className="mt-[22px] mb-[30px] max-w-[40ch] text-[1.15rem] text-muted">{lede}</p>
        <div className="flex flex-wrap gap-3">{actions}</div>
      </div>
      {visual}
    </div>
  )
}

export function SubHead({ title, text, className = 'mb-10' }: { title: string; text: string; className?: string }) {
  return (
    <div className={`max-w-[640px] ${className}`}>
      <h3 className="text-[clamp(1.7rem,3vw,2.4rem)] tracking-[-0.03em]">{title}</h3>
      <p className="mt-3.5 text-[1.08rem] text-muted">{text}</p>
    </div>
  )
}
