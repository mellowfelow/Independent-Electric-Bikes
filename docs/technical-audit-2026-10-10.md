# Technical audit, 2026-10-10 (WebForge)

Scope: internal linking, technical/SEO/accessibility/performance, agent-ready files, Reply Portal, Redis, order and enquiry workflows. Live checks were run against https://independentelectricbikes.com.au. Lighthouse 12.6 (mobile profile, simulated throttling) ran against a local production build, so absolute timings are pessimistic.

## 1. Internal linking (before -> after)
| Check | Before | After |
|---|---|---|
| Subcategory/type pages with no in-content inbound link | 64 | 0 |
| Brand pages with products | 75 of which 2 empty (Vallkree, Xtracycle) in the sitemap | 159, all with products; empty brands dropped from sitemap and static params |
| Products with a brand page | 313 of 461 | 461 of 461 |
| Product breadcrumb | Home > Shop > Product | Home > Shop > Category > Subcategory > Product (visible + BreadcrumbList) |
| Category page | schema-only breadcrumb, no in-content links | visible breadcrumb, browse-by-type chips, top brands, link to matching parts or vehicles |
| Product page links | related list | "More in <category>" and "More from <brand>", compatible parts both ways |
| Blog | 3 links per post | related-product links and 3 more guides on every post |
| Orphans (zero in-content inbound) | 66 | 0 |

## 2. Critical findings fixed
- **Blog duplicate content and unsupported claims.** All 10 guides rendered the same body text, which also said "Flagship VYRON electric bikes utilize 80Nm Bafang rear hub motors" and recommended specific cell brands. Now only the commuter guide has a body (claims removed); the other 9 are short summaries marked noindex and left out of the sitemap until the articles are written (SEO phase).
- **Reply Portal hardening:** constant-time passcode compare; 10 wrong guesses locks an IP out for 10 minutes; passcode no longer copied into a cookie; PATCH accepts only known order statuses; "payment details sent" is set only when the email really sent (previously set even if the email failed); checkout no longer reports "Confirmation email sent" when it was not, and returns an error instead of false success when an order was neither stored nor emailed.
- **robots.txt:** each AI crawler group repeated no Disallow lines, so /admin/ and the order pages were open to those bots. Fixed.
- **Wording:** payment text read "$1,398.00 AUD AUD"; "Melbourne showroom team" on the thank-you page replaced with "Brunswick team".

## 3. Redis and environment (Vercel project independent-electric-bikes)
- Env vars present: KV_URL, KV_REST_API_URL, KV_REST_API_TOKEN, KV_REST_API_READ_ONLY_TOKEN, REDIS_URL (Vercel Redis integration), SMTP_HOST/PORT/USER/PASS/FROM, CONTACT_EMAIL, ORDER_EMAIL, WHOLESALE_EMAIL, ADMIN_PASSCODE.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` still hold the template placeholder (`your-upstash-redis-url...`). The code ignores them, but they caused 76 runtime errors on 7-8 Oct before the KV variables took priority. No errors since. **Delete these two variables in Vercel**; Vercel also flags the token as a "readable secret".
- Latest 5 production deployments READY; no runtime errors in the last 7 days after the fix.

## 4. Workflow test on production (test records deleted afterwards)
Order (WhatsApp channel) -> saved in Redis -> listed in admin -> public payment-details page -> admin sent payment email (parsed 3 fields) -> wrong email rejected, right email confirms payment -> status updated. Enquiry -> saved -> listed -> reply email sent -> status "replied". Wrong passcode returns 401, no passcode 401. All steps passed. Six emails went to sales@independentelectricbikes.com.au.

## 5. Lighthouse (mobile, local build)
| Page | Perf | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Home | 62-78 | 97-100 | 100 | 92 |
| Category (E-Bikes) | 85 | 100 | 100 | 92 |
| Product | 92 | 100 | 100 | 92 |
| Brand | 89-93 | 100 | 100 | 92 |
- Accessibility rose from 88-93 to 99-100 (button contrast, target size, heading order, footer link).
- SEO 92 on every page is a single audit: `robots.txt` line `Content-Signal` is reported as an "unknown directive". It is the agent-ready content-signal standard and is ignored by Google, so it was kept deliberately.
- **Home performance is below the 95 target.** LCP 5-6s and TBT ~500ms on a simulated slow phone: the page has ~1,200 DOM nodes and heavy hydration (Trustpilot block, 8 product cards, 5 slides). Fixes applied: later hero slides no longer load with the page, below-fold images are lazy, hero image preloaded per screen size. Remaining work: reduce home DOM and defer the reviews block.
- Category pages 3.9-4.0s LCP, product pages 3.2s.

## 6. Agent-ready and headers (live)
llms.txt, auth.md, server-card, acp.json, sitemap return 200 with correct types; `/.well-known/api-catalog` and `ucp` serve as application/octet-stream (known Vercel limitation, noted in the skill); MCP `tools/list` answers over POST; GET returns 405 (valid for a POST-only server). Security headers (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) and the Link header are present.

## 7. Open items for the SEO phase
1. Write the 9 guide articles (currently noindex summaries). Unique, sourced, no unverified brand claims.
2. Homepage trust bar still says "Samsung & Bafang Drive" and "2-Year VYRON Warranty"; product pages state "2-Year Frame Warranty & 12-Month Electrical Warranty". The catalogue is mostly Bosch, Shimano and Yamaha bikes. Confirm the warranty terms and reword.
3. Home performance work above; consider self-hosting fonts if any are added.
4. Customer reviews block shows "2,748" reviews and a "Brunswick showroom" visit quote: confirm both are real and migrated from the old site (kept untouched as instructed).
5. Specs are verified for only 3 products; descriptions are placeholders for the rest. Keyword-mapped product and category copy is the main SEO gap.
6. Photos, specs and category tiles for the two merged categories still use the shared accessories tile.
7. Rich Results Test (Google) was not run: it has no scriptable interface and needs a manual pass per schema type.
