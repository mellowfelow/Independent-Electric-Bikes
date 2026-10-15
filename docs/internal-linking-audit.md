# Internal linking audit (2026-10-15)

Method: crawl of every prerendered page in the production build (`npm run build`, then `npm run check:links`). Pages whose canonical URL is a different path (the 512 `/shop/<cat>/<sub>/<product>/` duplicates) are ignored, so numbers describe the 861 real pages. "Contextual" links exclude the header and footer.

## Structure (unchanged, healthy)
- Home -> 10 categories -> sub-categories -> products. Max click depth from home is 3; every page is reachable (0 orphans).
- Category and sub-category pages already carry in-content links (types, popular brands, parts for these models) via `components/CategoryLinks.tsx`.
- Product pages link to their category, brand, compatible parts and related models.
- Every canonical product page is linked from 3+ other pages (one exception with 2).

## Problems found and fixed
| Finding | Before | After |
|---|---|---|
| Broken internal links (blog "shop related" links pointing at sub-categories that do not exist) | 16 links, 6 targets | 0 |
| Product/category pages linking to any guide | 0 of 575 | 575 (3 topic-matched guides each) |
| Brand pages linking to any guide | 0 of 173 | 173 |
| Average contextual inbound links per guide | 4.2 | 31.7 |
| Products with only 1-2 contextual inbound links | 131 | 1 |
| Products with 11+ inbound links | 210 | 267 |
| Home page links to brand pages | 0 | 19 (top brands + all brands) |
| Product card "Details ->" links with generic anchor text (5,183 uses) | generic | accessible name now includes the product name |
| Crypto-discount guide inbound links | 1 | linked from every product page |

How the fixes work:
- `lib/guides.ts` + `components/RelatedGuides.tsx`: each category, sub-category, product and brand page lists 3 guides whose primary shop category matches. Picks rotate by page slug so every guide is linked evenly.
- `lib/compat.ts` `relatedProducts`: sibling models are taken in a ring starting after the current product, so every product is linked from its next few neighbours instead of everyone linking to the same first products.
- `config/blogLinks.ts`: corrected sub-category hrefs; fixed two guides filed under the wrong category (panniers, phone mounts).

## Remaining notes
- Small brands (about 20) have 2 contextual inbound links (brands index + one product). That is all the content they have; they are all in the sitemap and brands index.
- 512 duplicate-path product URLs exist and canonicalise correctly. They are not linked internally.
- Re-run `npm run build && npm run check:links` after adding products, brands or guides. It exits non-zero on broken links or unreachable pages.
