import { useCallback, useEffect, useRef, useState } from 'react'
import { products } from '../data/products'
import { peeks } from './Peeks'

interface HeroProps {
  onOpenProduct: (id: string) => void
}

const card =
  'grid snap-start animate-rise gap-7 rounded-[18px] border p-[22px] shadow-[0_24px_60px_-36px_#16213a55] sm:p-7 lg:min-h-[340px]'
const arrow =
  'size-12 cursor-pointer rounded-full border-[1.5px] border-ink bg-surface text-xl font-semibold text-ink hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-30 disabled:hover:bg-surface disabled:hover:text-ink'

export function Hero({ onOpenProduct }: HeroProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const slides = [...products.map((p) => ({ key: p.id, label: p.name })), { key: 'ask', label: 'Work with us' }]

  const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[]

  const findCurrent = useCallback(() => {
    const track = trackRef.current
    if (!track) return 0
    let best = 0
    let dist = Infinity
    cards().forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - track.offsetLeft - track.scrollLeft)
      if (d < dist) {
        dist = d
        best = i
      }
    })
    return best
  }, [])

  const sync = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCurrent(findCurrent())
    setAtStart(track.scrollLeft < 4)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4)
  }, [findCurrent])

  const go = (i: number) => {
    const track = trackRef.current
    const list = cards()
    if (!track || !list.length) return
    const target = list[Math.max(0, Math.min(list.length - 1, i))]
    track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let t: number | undefined
    const onScroll = () => {
      window.clearTimeout(t)
      t = window.setTimeout(sync, 60)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', sync)
    sync()
    return () => {
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', sync)
      window.clearTimeout(t)
    }
  }, [sync])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      go(findCurrent() + (e.key === 'ArrowRight' ? 1 : -1))
    }
  }

  return (
    <section className="wrap pt-8 pb-[88px] sm:pt-14" aria-labelledby="hero-title">
      <div className="mb-10 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <h1 id="hero-title" className="max-w-[15ch] text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.02] font-bold tracking-[-0.04em]">
            AI products for work that runs on knowledge.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[1.15rem] text-muted">
            We build focused tools for people who depend on information that keeps changing, and who need to trust
            what they're reading.
          </p>
        </div>
        <div className="hidden flex-none gap-2.5 sm:flex">
          <button type="button" className={arrow} aria-label="Previous product" disabled={atStart} onClick={() => go(current - 1)}>
            ‹
          </button>
          <button type="button" className={arrow} aria-label="Next product" disabled={atEnd} onClick={() => go(current + 1)}>
            ›
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Products we're building"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="no-scrollbar -m-1 grid auto-cols-[92%] grid-flow-col gap-5 overflow-x-auto snap-x snap-mandatory p-1 pb-2 sm:auto-cols-[88%] lg:auto-cols-[min(640px,82%)]"
      >
        {products.map((p, i) => {
          const Peek = peeks[p.id]
          return (
            <article
              key={p.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${p.name}`}
              style={{ animationDelay: `${i * 80}ms` }}
              className={`${card} border-line bg-surface lg:grid-cols-2`}
            >
              <div className="flex flex-col">
                <span className={`chip chip-${p.status} self-start`}>{p.statusLabel}</span>
                <h2 className="mt-4 mb-2.5 text-[1.9rem] tracking-[-0.03em]">{p.name}</h2>
                <p className="text-muted">{p.summary}</p>
                <p className="mt-3.5 text-[0.88rem] text-muted">
                  <b className="font-semibold text-ink">For</b> {p.audience}
                </p>
                <a className="btn btn-solid mt-6 self-start lg:mt-auto" href={`#${p.id}`} onClick={() => onOpenProduct(p.id)}>
                  {p.cta}
                </a>
              </div>
              {Peek && <Peek />}
            </article>
          )
        })}

        <article
          aria-roledescription="slide"
          aria-label={`${slides.length} of ${slides.length}: Work with us`}
          style={{ animationDelay: `${products.length * 80}ms` }}
          className={`${card} border-ink bg-ink text-[#e7ecf4]`}
        >
          <div className="flex flex-col">
            <span className="chip self-start bg-ink-2 text-[#7fd8c2]">Open</span>
            <h2 className="mt-4 mb-2.5 max-w-[20ch] text-[1.9rem] tracking-[-0.03em]">Have a knowledge problem like these?</h2>
            <p className="max-w-[48ch] text-night-muted">
              If your team loses time to information nobody trusts, we'd like to hear about it. Our next product may
              start with your problem.
            </p>
            <a className="btn mt-6 self-start border-paper bg-paper text-ink lg:mt-auto" href="#contact">
              Tell us about it
            </a>
          </div>
        </article>
      </div>

      <div className="mt-6 flex gap-2" role="group" aria-label="Choose a product">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            aria-label={`Show ${s.label}`}
            aria-current={i === current ? 'true' : 'false'}
            onClick={() => go(i)}
            className="h-2.5 w-2.5 cursor-pointer rounded-full bg-line transition-all aria-[current=true]:w-7 aria-[current=true]:bg-ink"
          />
        ))}
      </div>
    </section>
  )
}
