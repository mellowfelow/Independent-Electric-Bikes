# INDEPENDENT ELECTRIC BIKES — Project Instructions

React / Next.js App Router e-commerce site for INDEPENDENT ELECTRIC BIKES (VYRON INDUSTRIES PTY LTD).
Deployed via Vercel / Next.js App Router.

## Architecture
`config/site.ts` is the single source of truth for products, categories, contact information, and `SITE.reply` config.
Adding or editing entries in `PRODUCTS` / `CATEGORIES` automatically updates pages, routes, metadata, JSON-LD schemas, sitemap, and agent discovery files.

`sitemap.xml`, `robots.txt` and `llms.txt` are generated from `config/` by `app/sitemap.ts`, `app/robots.txt/route.ts` and `app/llms.txt/route.ts` - edit the config, never add static copies to `public/`.
The `public/.well-known/*`, `auth.md` and `js/webmcp.js` files are static declarations: update them by hand when endpoints or contact details change.

## Reply Portal (Gated Admin Dashboard)
- Location: `/admin` (Passcode Gated, default passcode: `orderreply`)
- Endpoints:
  - `/api/admin/orders/` & `/api/admin/orders/[id]/`
  - `/api/admin/enquiries/` & `/api/admin/enquiries/[id]/`
  - `/api/admin/send-payment-email/`
  - `/api/admin/reply-enquiry/`
- Authentication via `X-Admin-Passcode` header or `ieb_admin_passcode` localStorage token.
- `ADMIN_PASSCODE` is a server-only environment variable (`process.env.ADMIN_PASSCODE`), never exposed as `NEXT_PUBLIC_*`.

## Environment Variables
Set in Vercel Dashboard Settings -> Environment Variables:
- `ADMIN_PASSCODE`: Server passcode for `/admin` portal (default: `orderreply`)
- `SMTP_HOST`: e.g. `smtp.zoho.com` or `smtp.gmail.com`
- `SMTP_PORT`: e.g. `465` (SSL) or `587` (TLS)
- `SMTP_USER`: e.g. `sales@independentelectricbikes.com.au`
- `SMTP_PASS`: App-specific password
- `SMTP_FROM`: e.g. `noreply@independentelectricbikes.com.au`
- `UPSTASH_REDIS_REST_URL`: Upstash Redis REST URL
- `UPSTASH_REDIS_REST_TOKEN`: Upstash Redis REST Token

## Real Brand Facts (Preserved)
- Entity Name: VYRON INDUSTRIES PTY LTD
- ABN: 23 618 699 479 (Active since 24 Apr 2017)
- HQ Location: 380 Sydney Road, Brunswick VIC 3056, Victoria, Australia
- Phone / WhatsApp: +61 480 811 308
- Domain: `independentelectricbikes.com.au`
