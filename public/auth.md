# Auth.md

## Site: INDEPENDENT ELECTRIC BIKES — E-Commerce Catalog & Ordering

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product Catalog | https://independentelectricbikes.com.au/shop/ |
| E-Bike Comparison | https://independentelectricbikes.com.au/compare/ |
| E-Bike Guides | https://independentelectricbikes.com.au/blog/ |
| FAQ | https://independentelectricbikes.com.au/faq/ |
| Contact & Support | https://independentelectricbikes.com.au/contact/ |

## Authentication

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All public e-commerce resources are openly accessible."
  }
}
```

## Ordering
Human-in-the-loop required. Agents may browse catalog, query specs, and prepare order drafts.
Orders are finalized by a human customer via Email or WhatsApp.
