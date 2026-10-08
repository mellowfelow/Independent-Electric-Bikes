import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, CATEGORIES, SHOP, SITE, CONTACT } from '@/config/site';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
    },
  });
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32700, message: 'Parse error' }, id: null },
      { status: 400 }
    );
  }

  const { jsonrpc, method, params, id } = body || {};

  if (jsonrpc !== '2.0') {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request' }, id: id || null },
      { status: 400 }
    );
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  // 1. initialize
  if (method === 'initialize') {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {},
          },
          serverInfo: {
            name: SITE.name,
            version: '1.0.0',
          },
        },
        id,
      },
      { headers: corsHeaders }
    );
  }

  // 2. tools/list
  if (method === 'tools/list') {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        result: {
          tools: [
            {
              name: 'search_products',
              description: 'Search electric bikes by keyword query, category slug, or max_price in AUD',
              inputSchema: {
                type: 'object',
                properties: {
                  query: { type: 'string' },
                  category: { type: 'string' },
                  max_price: { type: 'number' },
                },
              },
            },
            {
              name: 'get_product',
              description: 'Get full technical specifications, motor/battery details, and pricing for a single electric bike by slug',
              inputSchema: {
                type: 'object',
                required: ['slug'],
                properties: {
                  slug: { type: 'string' },
                },
              },
            },
            {
              name: 'list_categories',
              description: 'List all electric bike categories (Commuter, Cargo, Folding, Fat Tire Cruisers) with product counts',
              inputSchema: {
                type: 'object',
                properties: {},
              },
            },
            {
              name: 'get_policies',
              description: `Get express shipping rules, warranty policies, minimum order ($${SHOP.minOrder} AUD), and payment options (Bank Transfer, PayID, ${SHOP.cryptoDiscount}% Crypto discount)`,
              inputSchema: {
                type: 'object',
                properties: {},
              },
            },
            {
              name: 'create_order_draft',
              description: 'Create a prefilled e-bike order draft with WhatsApp and Checkout URL. Human customer completes the transaction.',
              inputSchema: {
                type: 'object',
                properties: {
                  items: { type: 'array' },
                  notes: { type: 'string' },
                },
              },
            },
          ],
        },
        id,
      },
      { headers: corsHeaders }
    );
  }

  // 3. tools/call
  if (method === 'tools/call') {
    const toolName = params?.name;
    const args = params?.arguments || {};

    if (toolName === 'search_products') {
      let filtered = [...PRODUCTS];
      if (args.query) {
        const q = String(args.query).toLowerCase();
        filtered = filtered.filter(
          (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        );
      }
      if (args.category) {
        filtered = filtered.filter((p) => p.category === args.category);
      }
      if (args.max_price) {
        filtered = filtered.filter((p) => p.price <= Number(args.max_price));
      }

      const results = filtered.map((p) => ({
        slug: p.slug,
        name: p.name,
        price: p.price,
        currency: SITE.currency,
        category: p.category,
        shortDescription: p.shortDescription,
        url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
      }));

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          result: {
            content: [{ type: 'text', text: JSON.stringify(results, null, 2) }],
          },
          id,
        },
        { headers: corsHeaders }
      );
    }

    if (toolName === 'get_product') {
      const product = PRODUCTS.find((p) => p.slug === args.slug);
      if (!product) {
        return NextResponse.json(
          {
            jsonrpc: '2.0',
            result: {
              content: [{ type: 'text', text: 'Product not found.' }],
              isError: true,
            },
            id,
          },
          { headers: corsHeaders }
        );
      }

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    ...product,
                    currency: SITE.currency,
                    url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
                  },
                  null,
                  2
                ),
              },
            ],
          },
          id,
        },
        { headers: corsHeaders }
      );
    }

    if (toolName === 'list_categories') {
      const categoriesWithCount = CATEGORIES.map((c) => ({
        ...c,
        productCount: PRODUCTS.filter((p) => p.category === c.slug).length,
        url: `https://${SITE.domain}/shop/${c.slug}/`,
      }));

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          result: {
            content: [{ type: 'text', text: JSON.stringify(categoriesWithCount, null, 2) }],
          },
          id,
        },
        { headers: corsHeaders }
      );
    }

    if (toolName === 'get_policies') {
      const policies = {
        minimumOrderAUD: SHOP.minOrder,
        freeShippingThresholdAUD: SHOP.freeShippingThreshold,
        flatShippingFeeAUD: SHOP.shippingFee,
        cryptoDiscountPercent: SHOP.cryptoDiscount,
        paymentMethods: SHOP.paymentMethods,
        warranty: '2-Year Frame Warranty & 12-Month Electrical Warranty by VYRON Industries',
        hq: CONTACT.hq,
        address: CONTACT.address,
        phone: CONTACT.phone,
      };

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          result: {
            content: [{ type: 'text', text: JSON.stringify(policies, null, 2) }],
          },
          id,
        },
        { headers: corsHeaders }
      );
    }

    if (toolName === 'create_order_draft') {
      const ref = `IEB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const itemsText = Array.isArray(args.items)
        ? args.items.map((i: any) => `- ${i.name || i.slug} x ${i.quantity || 1}`).join('\n')
        : 'Selected Electric Bike';

      const greeting = `Hi ${SITE.name},`;
      const waMsg = `${greeting}\n\nI would like to place an order draft (#${ref})!\n\nItems:\n${itemsText}\n\nNotes: ${args.notes || 'None'}`;
      const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(waMsg)}`;
      const checkoutUrl = `https://${SITE.domain}/shop/?draft=${ref}`;

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  orderRef: ref,
                  status: 'draft_created',
                  whatsappOrderUrl: waUrl,
                  webCheckoutUrl: checkoutUrl,
                  note: 'This is a prefilled draft. Human customer completes the transaction.',
                }),
              },
            ],
          },
          id,
        },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: { code: -32601, message: `Tool not found: ${toolName}` },
        id,
      },
      { status: 404, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    { jsonrpc: '2.0', error: { code: -32601, message: 'Method not found' }, id },
    { status: 404, headers: corsHeaders }
  );
}
