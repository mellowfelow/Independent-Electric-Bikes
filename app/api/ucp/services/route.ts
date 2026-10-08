import { NextResponse } from 'next/server';
import { SITE, SHOP, CONTACT } from '@/config/site';

export async function GET() {
  return NextResponse.json(
    {
      ucp: "1.0",
      protocol_version: "1.0",
      site: `https://${SITE.domain}`,
      services: [
        {
          id: 'product-catalog',
          type: 'catalog',
          url: `https://${SITE.domain}/shop/`,
          description: 'Full electric bike catalog',
        },
        {
          id: 'mcp-server',
          type: 'mcp',
          url: `https://${SITE.domain}/api/mcp/`,
          description: 'Streamable HTTP MCP Server',
        },
        {
          id: 'order',
          type: 'commerce',
          url: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi ${SITE.name}, `)}`,
          description: 'Order electric bikes via WhatsApp or Email',
        },
      ],
      currency: SITE.currency,
      minimum_order_aud: SHOP.minOrder,
      payment_methods: SHOP.paymentMethods,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
