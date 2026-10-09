import { ProductHead, ProductSection } from './Section'

interface Props {
  focused: boolean
  onInterest: (product: string) => void
}

const points = [
  ['Stay in the record', 'The original record stays front and centre. Notes appear alongside it, not in another window.'],
  ['Every note has a page', 'Each finding points to where it was documented, so the appeal is built on evidence.'],
  ['The coder decides', 'Notes are suggestions. Coders accept, edit or dismiss each one.'],
]

const noteCard = 'rounded-lg border border-line bg-surface px-[11px] py-[9px] text-muted'

// All record content here is generic sample text, not real patient data.
export function MedicalCoder({ focused, onInterest }: Props) {
  return (
    <ProductSection id="medical-coder" titleId="mc-title" focused={focused}>
      <ProductHead
        focused={focused}
        titleId="mc-title"
        title="Medical coder review"
        chip={<span className="chip chip-dev">In development</span>}
        lede="Open the record, scroll as you normally would, and watch a notepad fill in beside it: services and diagnoses that may be missing from the claim, each linked to the page it came from."
        actions={
          <a className="btn btn-solid" href="#contact" onClick={() => onInterest('Medical coder review')}>
            Get updates
          </a>
        }
        visual={
          <div
            aria-label="Illustration of a record with review notes, using sample content"
            className="grid overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_24px_60px_-28px_#16213a55] sm:grid-cols-[1.35fr_1fr]"
          >
            <div className="flex flex-col gap-2.5 p-[22px] font-serif text-[0.98rem] leading-[1.65]">
              <div className="font-sans text-[0.8rem] text-muted">
                <b className="text-ink">Progress note</b> · page 4 of 18 · sample record
              </div>
              <div>Patient seen for follow-up. Vitals stable. Medication reviewed and adjusted.</div>
              <div className="-mx-1 rounded-md bg-rose-bg px-[9px] py-[5px] shadow-[inset_3px_0_0_var(--color-rose)]">
                Additional condition assessed; management documented in plan.
              </div>
              <div>Follow-up in three months.</div>
            </div>
            <div className="flex flex-col gap-2.5 border-t border-line bg-paper p-5 text-[0.86rem] sm:border-t-0 sm:border-l">
              <h4 className="text-[0.95rem]">Review notes</h4>
              <div className={noteCard}>
                <b className="block font-semibold text-ink">Possible missing diagnosis</b>Documented on p. 4, not on claim
              </div>
              <div className={noteCard}>
                <b className="block font-semibold text-ink">Service supported</b>Visit level backed by p. 3–4
              </div>
              <small className="text-muted">Notes update as you scroll</small>
            </div>
          </div>
        }
      />

      <div className="mt-[88px] grid gap-9 border-t border-line pt-8 lg:grid-cols-3">
        {points.map(([title, text]) => (
          <div key={title}>
            <h4 className="mb-2 text-[1.12rem]">{title}</h4>
            <p className="text-[0.96rem] text-muted">{text}</p>
          </div>
        ))}
      </div>
    </ProductSection>
  )
}
