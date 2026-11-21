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

Contact form delivery:

1. **Web3Forms (primary).** The form posts directly from the visitor's browser to Web3Forms, which emails the inquiry (Reply-To set to the lead). The access key lives in `src/lib/site.ts` and can be overridden with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. Web3Forms access keys are public by design; free-plan submissions must come from the browser, not a server.
2. **Webhook (fallback, used only if no Web3Forms key is set).** `CONTACT_WEBHOOK_URL`: inquiries are POSTed as JSON by `/api/contact`. If neither is configured, visitors are offered a prefilled email instead.

## Notes

- Hero photography is from Unsplash (Unsplash License), converted to monochrome.
- Privacy Policy and Terms are baseline drafts and should be reviewed by counsel.
