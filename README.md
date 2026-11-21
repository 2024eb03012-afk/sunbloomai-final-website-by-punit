# sunbloomai.com

Marketing site for Sunbloom AI — Enterprise AI & Data Infrastructure. Next.js (App Router) + Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

| Path | What it is |
| --- | --- |
| `src/app/*/page.tsx` | Pages: home, data-operations, enterprise-ai, evaluation, research, company, contact, careers, privacy, terms |
| `src/app/api/contact/route.ts` | Contact form endpoint |
| `src/components/site/` | Design-system pieces: header, footer, hero, buttons, section primitives |
| `src/lib/site.ts` | Company details, navigation, pillars, inquiry types: edit here first |
| `src/content/research.ts` | Research & insights entries (empty until real articles are published) |
| `src/app/globals.css` | Design tokens (colours, type scale, buttons, fields, motion) |
| `public/images/` | Pre-optimised monochrome hero photography (`name.webp` 2400px, `name-sm.webp` 1200px) |

## Configuration

| Variable | Purpose |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | Where contact inquiries are POSTed as JSON (e.g. an n8n/Zapier/Make webhook or CRM intake). If unset, the form tells the visitor online submission is unavailable and offers a prefilled email to the company address instead. |

## Notes

- Hero photography is from Unsplash (Unsplash License), converted to monochrome.
- Privacy Policy and Terms are baseline drafts and should be reviewed by counsel.
