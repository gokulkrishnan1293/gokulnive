import { DocDemo } from './DocDemo'
import { ProductHead, ProductSection, SubHead } from './Section'

interface Props {
  focused: boolean
  onInterest: (product: string) => void
}

const model = [
  {
    title: 'Objects',
    text: 'The things your team works with, each with its own properties.',
    items: ['Service', 'API', 'Doc page', 'Runbook', 'Decision', 'Ticket', 'Owner'],
    card: 'border-line',
    item: 'border border-line bg-paper',
  },
  {
    title: 'Links',
    text: 'How those things relate, so a change in one shows what else it touches.',
    items: ['exposes', 'documented by', 'decided in', 'changed by', 'owned by'],
    card: 'border-line',
    item: 'border border-dashed border-line bg-paper',
  },
  {
    title: 'Actions',
    text: 'What the brain and your team can do, always with a person approving.',
    items: ['Flag as stale', 'Draft update', 'Request review', 'Publish'],
    card: 'border-fresh',
    item: 'bg-fresh-bg text-fresh-ink',
  },
]

const steps = [
  ['Bring it in', 'Drop in PDFs and files, or connect GitHub, Jira and Confluence. Everything becomes plain markdown.'],
  ['Build the ontology', 'Services, APIs, decisions and pages become objects, linked to the code and tickets behind them.'],
  ["Spot what's stale", 'When a pull request or ticket touches something, every linked page is checked and flagged if it no longer matches.'],
  ['Approve the fix', 'You get a drafted update with its sources. Accept, edit or reject it. Nothing publishes without you.'],
]

// Step 3 is where something goes stale (amber), step 4 where it's fixed (teal).
const stepBadge = [
  'border-ink bg-paper',
  'border-ink bg-paper',
  'border-stale bg-stale-bg',
  'border-fresh bg-fresh-bg',
]

export function OntologyBrain({ focused, onInterest }: Props) {
  return (
    <ProductSection id="ontology-brain" titleId="ob-title" focused={focused}>
      <ProductHead
        focused={focused}
        titleId="ob-title"
        title="Ontology Brain"
        chip={<span className="chip chip-live">Early access</span>}
        lede="Maps your services, APIs, decisions and docs as one connected model. When a change makes a page out of date, it flags it and drafts the fix for your team to approve."
        actions={
          <>
            <a className="btn btn-solid" href="#contact" onClick={() => onInterest('Ontology Brain')}>
              Join early access
            </a>
            <a className="btn btn-ghost" href="#ob-how">
              How it works
            </a>
          </>
        }
        visual={<DocDemo />}
      />

      <div className="mt-[88px]">
        <SubHead
          title="Your software, as an ontology."
          text="Instead of a pile of pages, a living model of the real things in your system, how they connect, and what can be done when one changes."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {model.map((m) => (
            <div key={m.title} className={`rounded-[14px] border bg-surface p-6 ${m.card}`}>
              <h4 className="mb-2 text-[1.25rem] tracking-[-0.02em]">{m.title}</h4>
              <p className="mb-4 text-[0.96rem] text-muted">{m.text}</p>
              <ul className="flex flex-wrap gap-2">
                {m.items.map((i) => (
                  <li key={i} className={`rounded-lg px-[11px] py-[5px] text-[0.85rem] ${m.item}`}>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[88px]" id="ob-how">
        <SubHead
          title="How it works"
          text={'From "something changed" to "the docs are right again", with a person approving every edit.'}
        />
        <ol className="grid gap-9 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map(([title, text], i) => (
            <li key={title} className="relative lg:pr-7">
              {i < steps.length - 1 && (
                <span aria-hidden="true" className="absolute top-5 right-0 left-10 hidden h-[1.5px] bg-line lg:block" />
              )}
              <span
                aria-hidden="true"
                className={`relative z-10 mb-5 grid size-10 place-items-center rounded-full border-[1.5px] font-bold ${stepBadge[i]}`}
              >
                {i + 1}
              </span>
              <h4 className="mb-2 text-[1.15rem]">{title}</h4>
              <p className="text-[0.96rem] text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-[88px] grid items-center gap-11 lg:grid-cols-2 lg:gap-14">
        <div>
          <SubHead
            className="mb-6"
            title="Built on files you own."
            text="Your knowledge lives as markdown in your own repository, not locked inside another tool."
          />
          <ul className="grid gap-3.5">
            {[
              ['Plain markdown in git.', 'Read it, diff it and review it like code.'],
              ['Every page shows its sources.', 'Linked PRs, tickets and documents sit in the file.'],
              ['Leave any time.', 'Your files keep working without us.'],
            ].map(([b, t]) => (
              <li
                key={b}
                className="relative pl-7 text-muted before:absolute before:top-[0.55em] before:left-0 before:size-3 before:rounded-[3px] before:bg-fresh-lite before:content-['']"
              >
                <strong className="font-semibold text-ink">{b}</strong> {t}
              </li>
            ))}
          </ul>
        </div>
        <pre
          aria-label="Example markdown file"
          className="m-0 overflow-x-auto rounded-[14px] bg-night px-6 py-[22px] font-mono text-[0.86rem] leading-[1.75] text-night-text"
        >
          <span className="text-[#7a87a3]"># knowledge/claims/claims-api-guide.md</span>
          {'\n'}
          <span className="text-[#7a87a3]">---</span>
          {'\n'}
          <Kv k="object" v="doc-page" />
          <Kv k="level" v="application" />
          <Kv k="service" v="claims-service" />
          <span className="text-[#7fd8c2]">sources:</span>
          {'\n  - '}
          <span className="text-[#f1c27a]">github:claims-service#482</span>
          {'\n  - '}
          <span className="text-[#f1c27a]">jira:CLM-219</span>
          {'\n'}
          <Kv k="linked" v="[runbook-claims, adr-014]" />
          <span className="text-[#7a87a3]">---</span>
          {"\n\n## Reading a claim's status\nThe response includes a `status` field\nwith the current claim state."}
        </pre>
      </div>
    </ProductSection>
  )
}

function Kv({ k, v }: { k: string; v: string }) {
  return (
    <>
      <span className="text-[#7fd8c2]">{k}:</span> <span className="text-[#f1c27a]">{v}</span>
      {'\n'}
    </>
  )
}
