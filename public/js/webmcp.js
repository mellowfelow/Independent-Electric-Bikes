(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search INDEPENDENT ELECTRIC BIKES by keyword, category, or max price in AUD",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            category: { type: "string" },
            max_price: { type: "number" }
          }
        },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(`https://independentelectricbikes.com.au/api/search/?${params}`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse INDEPENDENT ELECTRIC BIKES product catalog by category",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string" }
          }
        },
        execute: async ({ category }) => {
          const url = category ? `https://independentelectricbikes.com.au/shop/${category}/` : `https://independentelectricbikes.com.au/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "order_via_whatsapp",
        description: "Initiate an e-bike order on WhatsApp. Minimum order $350 AUD. Human customer completes.",
        inputSchema: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        execute: async ({ message }) => {
          const greeting = "Hi INDEPENDENT ELECTRIC BIKES, ";
          const url = `https://wa.me/61480811308?text=${encodeURIComponent(greeting + (message || ''))}`;
          window.open(url, '_blank');
          return { url };
        }
      },
      {
        name: "compare_ebikes",
        description: "Open e-bike motor and battery spec comparison matrix",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://independentelectricbikes.com.au/compare/`;
          return { url: `https://independentelectricbikes.com.au/compare/` };
        }
      },
      {
        name: "contact_showroom",
        description: "Contact Brunswick sales & service support",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://independentelectricbikes.com.au/contact/`;
          return { url: `https://independentelectricbikes.com.au/contact/` };
        }
      }
    ]
  });
})();
