import { Logo } from './Logo'
import { products } from '../data/products'

export function Nav() {
  return (
    <header className="wrap flex h-[76px] items-center justify-between">
      <a href="#top" aria-label="GokulNive home" className="flex items-center gap-2.5 text-xl font-bold tracking-[-0.03em] no-underline">
        <Logo className="size-8" />
        GokulNive
      </a>
      <nav aria-label="Main" className="flex items-center gap-7 text-[0.93rem]">
        {products.map((p) => (
          <a key={p.id} href={`#${p.id}`} className="hidden text-muted no-underline hover:text-ink sm:inline">
            {p.name}
          </a>
        ))}
        <a className="btn btn-solid min-h-10 px-[18px]" href="#contact">
          Talk to us
        </a>
      </nav>
    </header>
  )
}
