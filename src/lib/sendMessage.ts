// Sends the contact form as an email through Web3Forms (https://web3forms.com),
// a form-to-email service that works from a static site with no server.
//
// Setup: create an access key for hello@gokulnive.com at web3forms.com and set
// VITE_WEB3FORMS_KEY in .env.local (local) and in your host's environment settings.
// Without a key the form falls back to opening the visitor's email app.

import { CONTACT_EMAIL } from '../data/products'

export interface ContactMessage {
  name: string
  email: string
  interest: string
  message: string
  botcheck: boolean // hidden honeypot; real visitors never tick it
}

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

export const canSendDirectly = Boolean(ACCESS_KEY)

export async function sendMessage(msg: ContactMessage): Promise<void> {
  const subject = `GokulNive: ${msg.interest}`

  if (!ACCESS_KEY) {
    const body = [`Name: ${msg.name}`, `Email: ${msg.email}`, `Interested in: ${msg.interest}`, '', msg.message].join('\n')
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    return
  }

  const data = new FormData()
  data.append('access_key', ACCESS_KEY)
  data.append('subject', subject)
  data.append('name', msg.name)
  data.append('email', msg.email) // used as reply-to, so you can answer straight from your inbox
  data.append('interest', msg.interest)
  data.append('message', msg.message || '(no message)')
  if (msg.botcheck) data.append('botcheck', 'on')

  let res: Response
  try {
    res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
  } catch {
    throw new Error("We couldn't reach the mail service. Check your connection and try again.")
  }

  const json = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null
  if (!res.ok || !json?.success) {
    throw new Error(
      res.status === 429
        ? 'Too many messages in a short time. Wait a minute and try again.'
        : json?.message || `The message wasn't sent. Email us directly at ${CONTACT_EMAIL}.`,
    )
  }
}
