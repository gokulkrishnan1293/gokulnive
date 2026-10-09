// One place to add, rename or re-status a product.
// The carousel, the product sections' anchors and the contact form all read from here.

export type ProductStatus = 'live' | 'dev'

export interface Product {
  id: string
  name: string
  status: ProductStatus
  statusLabel: string
  summary: string
  audience: string
  cta: string
}

export const products: Product[] = [
  {
    id: 'ontology-brain',
    name: 'Ontology Brain',
    status: 'live',
    statusLabel: 'Early access',
    summary:
      "Docs that know when they're wrong. It links your code, tickets and docs, then flags pages a change has made out of date.",
    audience: 'software and platform teams',
    cta: 'Explore Ontology Brain',
  },
  {
    id: 'medical-coder',
    name: 'Medical coder review',
    status: 'dev',
    statusLabel: 'In development',
    summary:
      'Review medical records for appeals and reconsideration faster, with findings noted beside the page as you read.',
    audience: 'medical coding and appeals teams',
    cta: 'Explore coder review',
  },
]

export const OTHER_INTEREST = 'Something else'
export const CONTACT_EMAIL = 'hello@gokulnive.com'
