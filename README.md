# GokulNive

Homepage for GokulNive, which builds AI products for work that runs on knowledge:

- **Ontology Brain**: keeps software teams' docs connected to their code, and flags pages a change has made out of date.
- **Medical coder review**: helps coders review medical records for appeals and reconsideration.

## Structure

A single static page, `index.html`, with no build step. Fonts load from Google Fonts; everything else is inline.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Deploy

Any static host works (GitHub Pages, Vercel, Netlify, S3 + CloudFront). Point `gokulnive.com` at it.
