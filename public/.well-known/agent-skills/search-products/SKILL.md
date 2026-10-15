---
name: search-products
description: Search e-bikes, scooters, skateboards, unicycles, mobility scooters, parts and accessories by keyword, category, or price
---

# search-products

Use the store MCP server at https://independentelectricbikes.com.au/api/mcp/ (Streamable HTTP, read-only) and call the search tool with a keyword, optional category and optional maximum price in AUD.
Alternatively call GET https://independentelectricbikes.com.au/api/search/?q=<terms>. Prices are in AUD. Only products with a verified specification table list technical figures; never infer motor, range or weight for the others.
