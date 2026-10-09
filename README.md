# GokulNive

Website for GokulNive, which builds AI products for work that runs on knowledge:

- **Ontology Brain**: keeps software teams' docs connected to their code, and flags pages a change has made out of date.
- **Medical coder review**: helps coders review medical records for appeals and reconsideration.

Built with React, TypeScript, Vite and Tailwind CSS.

## Run locally

```bash
npm install
cp .env.example .env.local   # then add your Web3Forms key
npm run dev                  # http://localhost:5173
```

`npm run build` writes the production site to `dist/`, and `npm run preview` serves that build.

## Project layout

```
src/
  data/products.ts        products shown in the carousel, nav and contact form
  components/
    Hero.tsx              headline and product carousel
    OntologyBrain.tsx     Ontology Brain section (uses DocDemo.tsx)
    MedicalCoder.tsx      Medical coder review section
    Contact.tsx           contact form
    Section.tsx           shared section layout
  lib/sendMessage.ts      sends the contact form as an email
  styles.css              Tailwind setup and design tokens (@theme)
```

To add a product, add it to `src/data/products.ts`, give it a preview in `Peeks.tsx`, and add its section to `App.tsx`.

## Contact form email

The form sends email through [Web3Forms](https://web3forms.com), which works from a static site with no server.

1. At web3forms.com, create an access key for `hello@gokulnive.com`. Messages are delivered to that address.
2. Put it in `.env.local` as `VITE_WEB3FORMS_KEY=...` for local development.
3. Add the same value as a repository secret named `VITE_WEB3FORMS_KEY` for the deployed site.

Without a key, the form falls back to opening the visitor's email app with the message filled in.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.

1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Secrets and variables → Actions → add `VITE_WEB3FORMS_KEY`.
3. Settings → Pages → Custom domain: `gokulnive.com`, then point your DNS at GitHub Pages.

Other static hosts (Vercel, Netlify, AWS S3 + CloudFront) work too: build command `npm run build`, output folder `dist`.
