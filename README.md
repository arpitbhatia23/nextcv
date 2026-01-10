# NextCV — AI Resume Builder

A Next.js resume-builder web app (server + client components) designed for fast resumes, templates, and PDF export. This README helps you run, deploy (Vercel), and prepare the project for sale or distribution.

---

## Project Overview

- Framework: Next.js (app directory)
- Features: template-driven resume builder, AI-assisted resume content, PDF generation, analytics dashboard, admin pages
- Recommended deployment: Vercel (first-class Next.js support)

---

## Demo / Preview

- Deploy a preview to Vercel and share the preview URL as your demo link.

---

## Quick Start (Local)

1. Clone the repository

```bash
git clone <your-repo-url>
cd nextcv
```

2. Install dependencies

```bash
npm ci
# or
npm install
```

3. Create a `.env.local` file at the repository root (see `Environment variables` section below)

4. Start development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
npm run start
```

---

## Environment variables

Create `.env.local` with the values your instance needs. Example variables used by this project (adapt to your stack):

```
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
PHONE_PE_CLIENT_ID=
PHONE_PE_CLIENT_SECRET=
PHONE_PE_CLIENT_VERSION=
PHONE_PE_REDIRECT_URL=
BASE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

SANITY_API_READ_TOKEN=

GOOGLE_GEN_AI_API_KEY=

AI_MODEL="gemini-2.5-flash-lite"
```

Notes:

- Do NOT commit `.env.local` to source control.
- On Vercel, set Environment Variables in the project Settings → Environment Variables.

---

## Vercel Deployment (recommended)

1. Sign in to Vercel and create a new project.
2. Import the repository from GitHub/GitLab/Bitbucket.
3. In Vercel's Build & Output settings:
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Install Command: `npm ci` (optional)
   - Output Directory: leave empty (Next.js on Vercel handles it)
4. Add Environment Variables (same names as `.env.local`) under Settings → Environment Variables.
5. Deploy. Vercel will run the build and provide a preview URL.

Optional Vercel settings:

- Enable Automatic Branch Deploys for staging previews.
- Add a custom domain and configure DNS in Vercel.
- Add Vercel Analytics for Core Web Vitals monitoring.

---

## Production Checklist (performance & security)

- Remove `console.log` from production code.
- Convert large images to WebP/AVIF and use `next/image` with `sizes`/`priority` for hero.
- Replace unnecessary `"use client"` at page-level; scope client components narrowly.
- Lazy-load heavy client libraries with `dynamic(..., { ssr: false })` (charts, PDF viewers).
- Use server-side pagination for large lists and virtualize UI lists (`react-window`) for long item sets.
- Cache expensive analytics results server-side (Redis) or use incremental static regeneration (ISR).
- Add security: rate limiting for API routes, input validation/sanitization, helmet (headers) if needed at edge.
- Set long cache headers for static assets and add cache busting for changed assets.
- Add unit / integration tests and add CI (GitHub Actions) to run tests on push.

Performance checks:

- Run Lighthouse and check LCP, CLS, TBT; add Lighthouse CI for PRs.
- Add bundle-size budgets and analyze using `next build` and `next telemetry` or `source-map-explorer`.

---

## Packaging & Preparing to Sell

Checklist before selling or handing off the product:

- Remove all secrets and example API keys from the repo.
- Provide a clean `.env.example` file with variable names and descriptions.
- Add a `LICENSE` file that specifies permitted usage (e.g., commercial license, MIT + paid support addendum).
- Add `README.md` (this file) and a short `SELLING.md` that lists what the buyer gets (support hours, customizations, included assets).
- Provide a hosted demo (Vercel preview or stable demo site) for buyers to evaluate.
- Add screenshots, feature list, and a short video demo or GIFs in the repo (do not include large files — link externally if needed).
- Prepare a CHANGELOG and a short migration guide if you expect buyers to upgrade.

Suggested distribution workflow:

1. Create a stable release tag (git tag) and a release ZIP for buyers.
2. Provide an installation guide with required environment variables and quick-start commands.
3. Offer optional paid setup: Vercel project linking, domain config, one-time customization.

Legal & licensing:

- Decide a license for the code. If you want to sell copies and prevent redistribution, you must craft a commercial license and include it in `LICENSE`.
- Consult legal counsel for customized licensing templates if needed.

---

## Recommended Next Steps (value-add)

- Add a `DEPLOY.md` with screenshots for Vercel steps and where to paste environment variables.
- Add a `.env.example` and `LICENSE` file.
- Add a `docs/` folder containing architecture notes, where to change templates, and how to extend analytics and payments.
- Add a demo account credentials page (separate from production secrets) and seed demo data for buyer testing.

---

## Support

If you need help customizing, deploying, or packaging this product for sale, include your contact details or offer paid support plans in `SELLING.md`.

---

## Acknowledgements

This project uses Next.js. Reuse or redistribute only under the license you choose.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
