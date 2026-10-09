import { useState } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { OntologyBrain } from './components/OntologyBrain'
import { MedicalCoder } from './components/MedicalCoder'
import { Contact } from './components/Contact'
import { CONTACT_EMAIL, products } from './data/products'

export default function App() {
  // Which product section to highlight after a carousel card is opened.
  const [focused, setFocused] = useState<{ id: string; n: number } | null>(null)
  const [interest, setInterest] = useState(products[0].name)

  // Bumping n remounts the section so the highlight replays on repeat clicks.
  const openProduct = (id: string) => setFocused((f) => ({ id, n: (f?.n ?? 0) + 1 }))
  const isFocused = (id: string) => focused?.id === id

  return (
    <>
      <Nav />
      <main id="top">
        <Hero onOpenProduct={openProduct} />
        <OntologyBrain
          key={`ob-${isFocused('ontology-brain') ? focused?.n : 0}`}
          focused={isFocused('ontology-brain')}
          onInterest={setInterest}
        />
        <MedicalCoder
          key={`mc-${isFocused('medical-coder') ? focused?.n : 0}`}
          focused={isFocused('medical-coder')}
          onInterest={setInterest}
        />
        <Contact interest={interest} onInterestChange={setInterest} />
      </main>
      <footer className="wrap flex flex-col justify-between gap-5 pt-9 pb-12 text-[0.88rem] text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} GokulNive</span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink">
          {CONTACT_EMAIL}
        </a>
      </footer>
    </>
  )
}
