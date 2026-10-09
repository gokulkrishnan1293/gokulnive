import { useRef, useState } from 'react'

const code = 'rounded bg-code px-[5px] py-px font-mono text-[0.86em]'
const pill = 'cursor-pointer rounded-full border-[1.5px] border-ink px-4 py-2 text-[0.86rem] font-semibold'

// Interactive example: an out-of-date doc line and the update that fixes it.
export function DocDemo() {
  const [done, setDone] = useState(false)
  const acceptRef = useRef<HTMLButtonElement>(null)
  const resetRef = useRef<HTMLButtonElement>(null)

  const accept = () => {
    setDone(true)
    requestAnimationFrame(() => resetRef.current?.focus())
  }
  const reset = () => {
    setDone(false)
    requestAnimationFrame(() => acceptRef.current?.focus())
  }

  return (
    <div>
      <article
        aria-label="Example of an out-of-date doc page and its proposed update"
        className="overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_24px_60px_-28px_#16213a55]"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5 text-[0.85rem] text-muted">
          <b className="font-semibold text-ink">claims-api / guide.md</b>
          <span className={`chip ${done ? 'chip-live' : 'chip-dev'}`}>{done ? 'Up to date' : 'Out of date'}</span>
        </div>

        <div className="px-5 pt-6 pb-1.5 font-serif text-base leading-[1.7] sm:px-[26px] sm:text-[1.06rem]">
          <h4 className="mb-2.5 font-serif text-[1.4rem] font-medium">Reading a claim's status</h4>
          <p className="mb-3">
            Call <code className={code}>GET /claims/{'{id}'}</code> to fetch the latest state of a claim.
          </p>
          <div
            className={`-mx-2.5 mb-3 rounded-md px-2.5 py-1.5 transition-[background-color,box-shadow] duration-400 ${
              done ? 'bg-fresh-bg shadow-[inset_3px_0_0_var(--color-fresh)]' : 'bg-stale-bg shadow-[inset_3px_0_0_var(--color-stale)]'
            }`}
          >
            The response includes a <code className={code}>{done ? 'status' : 'status_code'}</code> field with the
            current claim state.
          </div>
        </div>

        <div className="mx-3 mt-1 mb-3.5 rounded-[10px] border border-line px-4 py-3.5 text-[0.92rem] sm:mx-[18px] sm:mb-[18px]">
          <p className="mb-2.5 text-muted">
            {done ? (
              <>
                <strong className="font-semibold text-ink">Update published.</strong> The runbook is queued for the same
                review.
              </>
            ) : (
              <>
                <strong className="font-semibold text-ink">PR #482 renamed this field.</strong> Two linked pages still
                describe <code className={code}>status_code</code>: this guide and the on-call runbook.
              </>
            )}
          </p>
          <div className="mb-3 flex flex-wrap gap-1.5" aria-label="Evidence">
            {['PR #482', 'Claims API contract', 'JIRA CLM-219'].map((e) => (
              <span key={e} className="rounded-full border border-line px-2.5 py-0.5 text-[0.78rem] text-muted">
                {e}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {done ? (
              <button ref={resetRef} type="button" onClick={reset} className={`${pill} bg-transparent text-ink`}>
                Show original
              </button>
            ) : (
              <button ref={acceptRef} type="button" onClick={accept} className={`${pill} bg-ink text-white`}>
                Accept update
              </button>
            )}
            <small aria-live="polite" className="text-[0.8rem] text-muted">
              {done ? 'Approved just now' : ''}
            </small>
          </div>
        </div>
      </article>
      <p className="mt-2.5 text-right text-[0.8rem] text-muted">Example of a review. Try accepting it.</p>
    </div>
  )
}
