import type { ReactNode } from 'react'

// Small decorative previews shown on the carousel cards.

const box = 'flex flex-col gap-2.5 rounded-xl border border-line bg-paper p-[18px] font-serif text-[0.95rem] leading-[1.55]'
const bar = 'flex justify-between font-sans text-[0.78rem] text-muted'
const note = 'rounded-lg border border-line bg-surface px-2.5 py-2 font-sans text-[0.8rem] text-muted'
const code = 'font-mono text-[0.84em]'

function Highlight({ tone, children }: { tone: 'stale' | 'fresh' | 'rose'; children: ReactNode }) {
  const tones = {
    stale: 'bg-stale-bg shadow-[inset_3px_0_0_var(--color-stale)]',
    fresh: 'bg-fresh-bg shadow-[inset_3px_0_0_var(--color-fresh)]',
    rose: 'bg-rose-bg shadow-[inset_3px_0_0_var(--color-rose)]',
  }
  return <div className={`-mx-1 rounded-md px-[9px] py-1.5 ${tones[tone]}`}>{children}</div>
}

export function OntologyPeek() {
  return (
    <div className={box} aria-hidden="true">
      <div className={bar}>
        <b className="font-semibold text-ink">claims-api / guide.md</b>
        <span>2 pages affected</span>
      </div>
      <Highlight tone="stale">
        The response includes a <code className={code}>status_code</code> field.
      </Highlight>
      <div className={note}>
        <b className="font-semibold text-ink">PR #482 renamed this field.</b> Update drafted for review.
      </div>
      <Highlight tone="fresh">
        The response includes a <code className={code}>status</code> field.
      </Highlight>
    </div>
  )
}

export function CoderPeek() {
  return (
    <div className={box} aria-hidden="true">
      <div className={bar}>
        <b className="font-semibold text-ink">Progress note · page 4</b>
        <span>Sample record</span>
      </div>
      <div>Patient seen for follow-up of chronic condition. Medication reviewed and adjusted.</div>
      <Highlight tone="rose">Additional condition assessed and documented in plan.</Highlight>
      <div className={note}>
        <b className="font-semibold text-ink">Possible missing diagnosis.</b> Documented on page 4, not on the claim.
      </div>
    </div>
  )
}

export const peeks: Record<string, () => JSX.Element> = {
  'ontology-brain': OntologyPeek,
  'medical-coder': CoderPeek,
}
