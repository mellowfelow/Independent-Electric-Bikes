# INDEPENDENT ELECTRIC BIKES (VYRON INDUSTRIES PTY LTD)

E-Commerce Store & Reply Portal built with Next.js 15 App Router, Tailwind CSS, and Upstash Redis.

## Deployment Steps (GitHub + Vercel)

```bash
1. Create a new GitHub repository (empty, no initial commit)
2. git init
3. git remote add origin https://github.com/[username]/[repo-name].git
4. git add .
5. git commit -m "Initial build — Independent Electric Bikes v11.1"
6. git push -u origin main
7. Go to vercel.com -> Add New Project -> Import from GitHub
8. CRITICAL: Set Framework Preset = "Next.js"
9. Environment Variables (Vercel Settings -> Environment Variables):
   - ADMIN_PASSCODE: orderreply
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
   - UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
10. Click Deploy
```

## Post-Deploy Checklist

1. Domain Verification: Add `independentelectricbikes.com.au` in Vercel Dashboard -> Settings -> Domains.
2. Search Console: Submit sitemap at `https://independentelectricbikes.com.au/sitemap.xml`.
3. Test Checkout: Submit a test order via both Email and WhatsApp checkout buttons and confirm the customer confirmation email arrives unconditionally.
4. Access Reply Portal: Visit `https://independentelectricbikes.com.au/admin`, enter passcode `orderreply`, test sending payment details emails and WhatsApp links.
5. Verify Agent Resources:
   - `https://independentelectricbikes.com.au/llms.txt`
   - `https://independentelectricbikes.com.au/auth.md`
   - `https://independentelectricbikes.com.au/.well-known/api-catalog`
   - `https://independentelectricbikes.com.au/.well-known/mcp/server-card.json`
