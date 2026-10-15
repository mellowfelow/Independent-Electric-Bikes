# Full technical, SEO, AI-visibility and agent-readiness audit (WebForge, 2026-10-15)

Scope: static tier (every prerendered page in the production build: 861 canonical pages) plus the live tier against https://independentelectricbikes.com.au (full sitemap crawl, headers, redirects, MCP and JSON APIs, Lighthouse 13.5 mobile). Builds on `docs/technical-audit-2026-10-10.md` and `docs/internal-linking-audit.md`.

## Scorecard
| Area | Before | After fixes |
|---|---|---|
| Technical (status codes, canonicals, redirects, headers, robots) | 90 | 96 |
| On-page SEO (titles, descriptions, H1, schema, social tags) | 74 | 93 |
| Internal linking | 96 | 96 (audited in docs/internal-linking-audit.md) |
| AI visibility (llms.txt, schema, entity facts) | 84 | 88 |
| Agent-ready (files, MCP, APIs) | 88 | 92 |
| Accessibility (Lighthouse, mobile) | 96-100 | 98-100 |
| Performance / Core Web Vitals | 74-89 | unchanged: main open item |
| Overall | 86 | 91 |

## What passed (live)
- All 860 sitemap URLs return 200; no noindex or redirected URL in the sitemap; every page's canonical equals its own URL; http->https and www->apex are 308 redirects; missing slash redirects; unknown URLs return a real 404.
- robots.txt valid: AI crawlers allowed, private paths disallowed in every group, `Content-Signal` present, sitemap declared. Lighthouse SEO is now 100 on every page type (the earlier 92 is gone).
- llms.txt follows the llmstxt.org shape (H1, blockquote, H2 sections with linked items, Optional section). auth.md starts with `# Auth.md`. All `.well-known` files return 200; MCP `initialize`, `tools/list`, `tools/call` work; live tools match the server card (no drift); JSON APIs return valid JSON with CORS and caching; webmcp.js is loaded.
- Security headers present on every page: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, plus the agent `Link` header.
- Exactly one H1 on every page; lang, viewport, canonical, meta description (120-158) on every page; JSON-LD parses on every page (Product, Offer, shipping, Breadcrumb, Store, WebSite+SearchAction, FAQPage, BlogPosting, ItemList).
- Lighthouse live: Accessibility 96-100, Best Practices 100, SEO 100, CLS 0 everywhere.

## Fixed in this pass
| # | Finding | Fix |
|---|---|---|
| 1 | **Open Graph and Twitter tags were wrong on almost every page.** The 100 posts, 10 categories and 173 brand pages shared the homepage's og:title, og:url (pointing at `/`, contradicting the canonical) and og:image; Twitter title/image were the homepage's on all pages; 503 product pages had no og:url. | New `lib/seo.ts` `withSocial()`; every indexable page now emits its own title, description, url, image and `article` type for posts. |
| 2 | 10 posts had two H1s (a markdown `# Title` duplicated the page H1). | `getBlogContent` drops a leading H1. |
| 3 | Footer column headings were `<h3>` with no `<h2>` before them (skipped level on pages such as Compare). The "recent purchase" toast used an `<h4>`. | Footer `<h2>`; toast is a paragraph. |
| 4 | `/checkout/` was indexable and not in robots.txt. | `noindex, nofollow` layout plus `Disallow: /checkout/` and `/api/admin/`. |
| 5 | 512 duplicate product URLs (`/shop/<cat>/<sub>/<product>/`) were built and served 200 (canonical-tagged). | No longer prebuilt; any non-canonical product path now 308-redirects to `/shop/<cat>/<product>/`. Build dropped from ~1,400 to 893 static pages. |
| 6 | `og:updated_time` was a build timestamp on every page under the wrong attribute (false freshness signal). | Removed. |
| 7 | Sitemap had no image entries. | 603 image entries (503 products, 100 posts) with absolute URLs. |
| 8 | Blog hero images had no width/height, srcset or fetch priority (CLS and LCP risk; LCP discovery flagged by Lighthouse). | 1600x900 dimensions, 800/1600 srcset, `fetchPriority=high`. |
| 9 | Low-contrast text (`text-slate-500` on dark, 3.7-4.2:1) failed WCAG AA on the home page and posts. | Raised to `text-slate-400` in 18 files (CopyField light theme untouched). |
| 10 | BlogPosting had no image or dateModified; Store schema had no contact point and `knowsAbout` listed Bafang/Samsung only. | Added image, dateModified, publisher url, ContactPoint, and a category-accurate `knowsAbout`. |
| 11 | Agent files still described an e-bike-only shop and claimed "EN15194 250W-500W 25km/h compliant" for everything (false for scooters, boards, quads). | Descriptions, tool text, productType and compliance wording updated in server-card, acp, ucp, skills, api-catalog, webmcp.js and the MCP route; skill digests regenerated. |
| 12 | Blog index title and description were e-bike-only. | Updated to cover all categories. |
| 13 | No Bing Webmaster Tools tag support. | `BING_VERIFICATION` env var renders `msvalidate.01` (same pattern as `GSC_VERIFICATION`). |

## Open items (not changed: need a decision, content or data)
1. **Performance is below the 95 target on every page type** (live mobile, Lighthouse simulated throttling): home 74, brand 83, post 86, product 87, category 89; LCP 1.6-3.6s, TBT 330-560ms.
   - Main-thread script and layout time (shared chunks 1255, 2826, main-app; home DOM size) is the cost; home also sends 1.4 MB.
   - All images are raw `<img>` (no AVIF, no automatic responsive sizes). Lighthouse estimates 592 KB savings on the home page from category tile images, which have stable names and only a 1-day cache. Re-run `scripts/images.mjs` style renditions for `/images/categories` and `/images/home`, then cache them longer.
   - One render-blocking stylesheet; 11 KB of legacy JavaScript.
   - Next `Link` prefetch of `/` from the logo appears to pull the home hero and home chunk onto every page: try `prefetch={false}` on that link.
2. **Homepage `aggregateRating` (4.8 from 2,748 reviews) is hard-coded.** Confirm it is real and attributable (the reviews carousel is also static data). Google ignores self-serving ratings on a Store/Organization anyway; if it cannot be verified, remove it.
3. **`RecentPurchasePopup` generates purchase notifications from sample names and towns.** That is fabricated social proof and conflicts with CLAUDE.md. Recommend removing it or replacing it with real orders.
4. **Product schema is valid but minimal.** Add `hasMerchantReturnPolicy` (from the real /returns policy), `priceValidUntil`, `gtin`/`mpn` where known, and delivery time in `shippingDetails`, for merchant-listing eligibility. Needs facts from you.
5. **Thin content:** 115 of 173 brand pages are under 300 words; 10 sub-category pages are 190-280 words; most product descriptions are templated and specs are verified for only a few models. This is the main ranking lever after launch.
6. Trust claims to verify: "Samsung & Bafang Drive" in the home trust bar and the warranty wording on product pages (2-year frame, 12-month electrical) versus a catalogue that is mostly Bosch, Shimano and Yamaha.
7. Organization schema has no `logo` (needs a raster logo of at least 112 px) and `sameAs` lists only Facebook and Instagram: confirm those profiles exist and add Google Business Profile, Trustpilot and others.
8. Agent-ready extras: no `text/markdown` content negotiation (isitagentready "Content" check); `/.well-known/api-catalog` and `ucp` serve as `application/octet-stream` (Vercel platform limitation, scanners accept it); MCP `initialize` answers protocol 2024-11-05 while the card advertises streamable HTTP; `/favicon.ico` is 404 (only SVG icons are linked).
9. Sitemap is one valid file of 860 URLs. Splitting into an index and adding `lastmod` for products would need real update dates, which the catalogue does not store.
10. About 20 small brand pages have only 2 contextual inbound links; harmless.

## Manual steps before submitting (cannot be automated)
1. Deploy this commit, then confirm `https://independentelectricbikes.com.au/robots.txt` shows `Disallow: /checkout/`.
2. **Google Search Console:** add the domain property (DNS TXT is best), or set `GSC_VERIFICATION` in Vercel and use the URL-prefix method. Submit `https://independentelectricbikes.com.au/sitemap.xml`. Use URL Inspection on `/`, one category, one product and one blog post.
3. **Bing Webmaster Tools:** simplest is "Import from Google Search Console". Otherwise set `BING_VERIFICATION` (the content value of `msvalidate.01`) in Vercel. Submit the sitemap. IndexNow key file is live at `/ieb2026indexnowkey998877.txt` (200).
4. **Google Rich Results Test** (the tool blocks automation, so run it by hand at https://search.google.com/test/rich-results): `/shop/electric-scooters/segway-ninebot-e2-pro-kickscooter/` (Product), `/` (Organization, WebSite, FAQ), `/blog/electric-scooter-wet-weather-rain-riding-tips/` (Article), `/faq/` (FAQPage), any category page (BreadcrumbList).
5. Run https://isitagentready.com/independentelectricbikes.com.au and https://pagespeed.web.dev for the home page, one category, one product and one post.
6. Delete the placeholder `UPSTASH_REDIS_REST_*` variables in Vercel (from the earlier audit).

## Test commands
- `npm run build && npm run check:links` (internal links, reachability, thin inbound links).
- Live crawl and agent checks used in this audit are reproducible with the scripts listed in the session scratchpad; the key ones (sitemap 200 crawl, MCP drift check) are worth promoting into `scripts/` if you want them in CI.
