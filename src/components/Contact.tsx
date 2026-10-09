import { FormEvent, useState } from 'react'
import { CONTACT_EMAIL, OTHER_INTEREST, products } from '../data/products'
import { canSendDirectly, sendMessage } from '../lib/sendMessage'

interface Props {
  interest: string
  onInterestChange: (value: string) => void
}

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent'; name: string } | { state: 'error'; message: string }

const label = 'grid gap-1.5 text-[0.9rem] font-semibold'

export function Contact({ interest, onInterestChange }: Props) {
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const name = String(f.get('name') ?? '').trim()

    setStatus({ state: 'sending' })
    try {
      await sendMessage({
        name,
        email: String(f.get('email') ?? '').trim(),
        interest,
        message: String(f.get('msg') ?? '').trim(),
        botcheck: f.get('botcheck') === 'on',
      })
      if (canSendDirectly) {
        form.reset()
        setStatus({ state: 'sent', name })
      } else {
        setStatus({ state: 'idle' })
      }
    } catch (err) {
      setStatus({ state: 'error', message: err instanceof Error ? err.message : 'The message wasn’t sent.' })
    }
  }

  const sending = status.state === 'sending'

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-y border-line bg-surface py-[72px] lg:py-24">
      <div className="wrap grid items-start gap-11 lg:grid-cols-2 lg:gap-[72px]">
        <div>
          <h2 id="contact-title" className="text-[clamp(2.1rem,4vw,3.2rem)] tracking-[-0.035em]">
            Talk to us.
          </h2>
          <p className="mt-4 max-w-[40ch] text-[1.1rem] text-muted">
            Join early access, follow a product, or tell us about a problem your team is stuck on. We reply to every
            message.
          </p>
        </div>

        {status.state === 'sent' ? (
          <div role="status" className="rounded-[14px] border border-fresh bg-fresh-bg p-7">
            <h3 className="text-[1.4rem]">Message sent.</h3>
            <p className="mt-2 text-fresh-ink">
              Thanks{status.name ? `, ${status.name}` : ''}. We'll reply to your email soon.
            </p>
            <button type="button" className="btn btn-ghost mt-5" onClick={() => setStatus({ state: 'idle' })}>
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-[18px]" aria-busy={sending}>
            <label className={label}>
              Your name
              <input className="field" name="name" required autoComplete="name" disabled={sending} />
            </label>
            <label className={label}>
              Work email
              <input className="field" name="email" type="email" required autoComplete="email" disabled={sending} />
            </label>
            <label className={label}>
              I'm interested in
              <select className="field" value={interest} onChange={(e) => onInterestChange(e.target.value)} disabled={sending}>
                {products.map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
                <option>{OTHER_INTEREST}</option>
              </select>
            </label>
            <label className={label}>
              Anything you'd like us to know (optional)
              <textarea className="field min-h-24 resize-y" name="msg" disabled={sending} />
            </label>

            {/* Honeypot for spam bots: hidden from people and screen readers. */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />

            {status.state === 'error' && (
              <p role="alert" className="rounded-[10px] bg-stale-bg px-3.5 py-3 text-[0.92rem] text-stale-ink">
                {status.message}
              </p>
            )}

            <button className="btn btn-solid" type="submit" disabled={sending}>
              {sending ? 'Sending…' : 'Send message'}
            </button>
            <p className="text-[0.84rem] text-muted">
              {canSendDirectly
                ? `Your message goes straight to ${CONTACT_EMAIL}.`
                : `This opens an email to ${CONTACT_EMAIL} with your details filled in.`}
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
