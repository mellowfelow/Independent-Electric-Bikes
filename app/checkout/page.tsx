'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ArrowRight,
  Lock,
  Building2,
  Coins,
  Minus,
  Plus,
  Trash2,
  ChevronLeft,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SITE, SHOP, CONTACT, REPLY } from '@/config/site';
import { money } from '@/lib/order';
import { waOrderLink } from '@/lib/whatsapp';
import { randomRef } from '@/lib/security';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [suburb, setSuburb] = useState('');
  const [stateTerritory, setStateTerritory] = useState('VIC');
  const [postcode, setPostcode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleteRef, setOrderCompleteRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [website, setWebsite] = useState(''); // honeypot

  const loadCart = () => {
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadCart, 0);
    window.addEventListener('ieb-cart-update', loadCart);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('ieb-cart-update', loadCart);
    };
  }, []);

  const updateQuantity = (slug: string, delta: number) => {
    const updated = items
      .map((item) => {
        if (item.slug === slug) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    setItems(updated);
    localStorage.setItem(SITE.cartKey, JSON.stringify(updated));
    window.dispatchEvent(new Event('ieb-cart-update'));
  };

  const removeItem = (slug: string) => {
    const updated = items.filter((item) => item.slug !== slug);
    setItems(updated);
    localStorage.setItem(SITE.cartKey, JSON.stringify(updated));
    window.dispatchEvent(new Event('ieb-cart-update'));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isMinOrderMet = subtotal >= SHOP.minOrder;
  const isFreeShipping = subtotal >= SHOP.freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : SHOP.shippingFee;
  const isCrypto = paymentMethod === 'crypto';
  const cryptoDiscount = isCrypto ? subtotal * 0.1 : 0;
  const finalTotal = (isCrypto ? subtotal * 0.9 : subtotal) + shippingCost;
  const gstInclusiveAmount = finalTotal / 11; // 10% GST included in AUD

  const handleCheckoutSubmit = async (e: FormEvent, channel: 'email' | 'whatsapp') => {
    e.preventDefault();
    setErrorMsg('');

    const computedAddress = streetAddress.trim()
      ? `${streetAddress.trim()}, ${suburb.trim()} ${stateTerritory} ${postcode.trim()}` + (deliveryNotes.trim() ? ` (Notes: ${deliveryNotes.trim()})` : '')
      : address.trim();

    if (!customerName.trim() || !email.trim()) {
      setErrorMsg('Please provide your Full Name and Email Address.');
      return;
    }

    if (!streetAddress.trim() && !address.trim()) {
      setErrorMsg('Please provide your Street Delivery Address.');
      return;
    }

    if (!isMinOrderMet) {
      setErrorMsg(`Minimum order requirement is ${money(SHOP.minOrder)}. Please add items to meet the threshold.`);
      return;
    }

    if (items.length === 0) {
      setErrorMsg('Your cart is empty. Please add products before placing an order.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderRefGuess = randomRef(REPLY.orderPrefix);
      const itemsFormattedText = items.map((i) => `${i.name} x ${i.quantity} (${money(i.price * i.quantity)})`).join('\n');
      const waUrl = waOrderLink(orderRefGuess, customerName, itemsFormattedText, money(finalTotal));

      if (channel === 'whatsapp') {
        window.open(waUrl, '_blank');
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'order',
          orderRef: orderRefGuess,
          website,
          name: customerName,
          email,
          phone,
          address: computedAddress,
          paymentMethod,
          channel,
          items,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const confirmedRef = data.orderRef || orderRefGuess;
        localStorage.removeItem(SITE.cartKey);
        setItems([]);
        window.dispatchEvent(new Event('ieb-cart-update'));
        window.location.href = `/thank-you-order/?ref=${encodeURIComponent(confirmedRef)}`;
      } else {
        setErrorMsg(data.message || 'There was an error processing your order.');
      }
    } catch {
      setErrorMsg('Failed to process checkout. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <span>/</span>
            <Link href="/shop/" className="hover:text-emerald-400">Shop</Link>
            <span>/</span>
            <span className="text-white">Secure Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Lock className="w-7 h-7 text-emerald-400" />
            <span>Independent Electric Bikes Checkout</span>
          </h1>
        </div>
        <Link
          href="/shop/"
          className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {items.length === 0 ? (
          /* Empty Cart Screen */
          <div className="max-w-lg mx-auto my-16 bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h2 className="text-xl font-extrabold text-white mb-2">Your Cart is Currently Empty</h2>
            <p className="text-sm text-slate-400 mb-6">You need at least one electric bike or accessory in your cart to proceed with checkout.</p>
            <Link
              href="/shop/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold transition-all shadow-lg"
            >
              <span>Explore E-Bikes Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Main Checkout Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Customer Details & Payment Options (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Customer Details */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                    1
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                      <span>Customer Contact & Courier Shipping Details</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-md border border-emerald-500/30 uppercase tracking-wider">
                        Required
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">Please provide your contact details for invoices, freight tracking, and delivery dispatch.</p>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-200 flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Customer Personal Contact Info Box */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-4">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Section A: Primary Customer Contact Information</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5">
                          Full Legal Name <span className="text-emerald-400 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. David Miller"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">First and last name for tax invoice and parcel identification.</p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5">
                          Email Address <span className="text-emerald-400 font-black">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. david@example.com.au"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                        />
                        <p className="text-[10px] text-emerald-400 font-semibold mt-1">
                          ✓ Official tax invoice & payment instructions sent directly to this email.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        Mobile Phone Number <span className="text-emerald-400 font-black">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0412 345 678"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Used exclusively for courier SMS dispatch updates and delivery day notifications.</p>
                    </div>
                  </div>

                  {/* Freight Delivery Address Box */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-4">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-400" />
                        <span>Section B: Courier Freight Delivery Address (Physical Street Address)</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">PO Boxes Not Accepted</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        Street Address / Unit / House Number <span className="text-emerald-400 font-black">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder="e.g. Unit 4, 12 High Street"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5">
                          Suburb / City <span className="text-emerald-400 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={suburb}
                          onChange={(e) => setSuburb(e.target.value)}
                          placeholder="e.g. Brunswick"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5">
                          State / Territory <span className="text-emerald-400 font-black">*</span>
                        </label>
                        <select
                          value={stateTerritory}
                          onChange={(e) => setStateTerritory(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
                        >
                          <option value="VIC">VIC - Victoria</option>
                          <option value="NSW">NSW - New South Wales</option>
                          <option value="QLD">QLD - Queensland</option>
                          <option value="SA">SA - South Australia</option>
                          <option value="WA">WA - Western Australia</option>
                          <option value="TAS">TAS - Tasmania</option>
                          <option value="ACT">ACT - Australian Capital Territory</option>
                          <option value="NT">NT - Northern Territory</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1.5">
                          Postcode <span className="text-emerald-400 font-black">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={postcode}
                          onChange={(e) => setPostcode(e.target.value)}
                          placeholder="e.g. 3056"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-200 mb-1.5">
                        Delivery Notes / Special Instructions <span className="text-slate-500">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="e.g. Leave inside front gate if unattended"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white">Choose Preferred Payment Method</h2>
                    <p className="text-xs text-slate-400">Payment details will be emailed to you upon order submission.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Bank Transfer */}
                  <label
                    onClick={() => setPaymentMethod('bank-transfer')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'bank-transfer'
                        ? 'bg-emerald-950/30 border-emerald-500 text-white'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank-transfer"
                      checked={paymentMethod === 'bank-transfer'}
                      onChange={() => setPaymentMethod('bank-transfer')}
                      className="mt-1 accent-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-xs">Direct Bank Transfer (EFT)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Pay via Westpac / ANZ / CBA / NAB bank transfer. Account BSB & Account Number provided on checkout completion.
                      </p>
                    </div>
                  </label>

                  {/* PayID / Osko */}
                  <label
                    onClick={() => setPaymentMethod('payid')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'payid'
                        ? 'bg-emerald-950/30 border-emerald-500 text-white'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="payid"
                      checked={paymentMethod === 'payid'}
                      onChange={() => setPaymentMethod('payid')}
                      className="mt-1 accent-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span className="font-bold text-xs">PayID / Osko (Instant Fast Payment)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Instant clearance using PayID (Email/ABN/Phone). Ideal for immediate dispatch authorization.
                      </p>
                    </div>
                  </label>

                  {/* Crypto */}
                  <label
                    onClick={() => setPaymentMethod('crypto')}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'crypto'
                        ? 'bg-emerald-950/30 border-emerald-500 text-white'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="crypto"
                      checked={paymentMethod === 'crypto'}
                      onChange={() => setPaymentMethod('crypto')}
                      className="mt-1 accent-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold text-xs">Cryptocurrency (BTC / USDT / ETH)</span>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/30">
                          SAVE 10%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Get an instant 10% discount on total cart value when paying via Bitcoin, USDT, or Ethereum.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 3: Order Actions */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white">Place Order & Receive Payment Details</h2>
                    <p className="text-xs text-slate-400">Choose your preferred channel to place order.</p>
                  </div>
                </div>

                {!isMinOrderMet && (
                  <div className="p-4 bg-amber-950/60 border border-amber-800/80 rounded-xl text-xs text-amber-200">
                    ⚠️ Minimum order requirement is <strong>{money(SHOP.minOrder)}</strong>. Current subtotal is {money(subtotal)}. Please add <strong>{money(SHOP.minOrder - subtotal)}</strong> worth of items to submit order.
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    disabled={!isMinOrderMet || isSubmitting}
                    onClick={(e) => handleCheckoutSubmit(e, 'email')}
                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 transition-all border border-slate-700 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Place Order (Email)</span>
                  </button>

                  <button
                    type="button"
                    disabled={!isMinOrderMet || isSubmitting}
                    onClick={(e) => handleCheckoutSubmit(e, 'whatsapp')}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-950/50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Order via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Confirmation email sent unconditionally on submit · 100% Secure Transaction</span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Card (5 Cols) */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-base font-extrabold text-white mb-4 flex items-center justify-between pb-3 border-b border-slate-800">
                  <span>Order Summary</span>
                  <span className="text-xs text-emerald-400 font-semibold">{items.reduce((acc, i) => acc + i.quantity, 0)} Items</span>
                </h3>

                {/* Items List */}
                <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1 mb-6">
                  {items.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80"
                    >
                      <div className="w-14 h-14 bg-white rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                        <img
                          src={item.image || 'https://picsum.photos/seed/ieb-bike/200/150'}
                          alt={item.name}
                          className="object-contain max-h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <p className="text-xs text-emerald-400 font-extrabold mt-0.5">{money(item.price)}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.slug, -1)}
                            className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.slug, 1)}
                            className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove item"
                        onClick={() => removeItem(item.slug)}
                        className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Price Calculations Breakdown */}
                <div className="space-y-2.5 text-xs border-t border-slate-800 pt-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">{money(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Freight Courier Shipping</span>
                    </span>
                    <span>
                      {isFreeShipping ? (
                        <span className="text-emerald-400 font-bold">FREE</span>
                      ) : (
                        money(SHOP.shippingFee)
                      )}
                    </span>
                  </div>

                  {isCrypto && (
                    <div className="flex justify-between text-emerald-400 font-bold bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/50">
                      <span>10% Crypto Discount</span>
                      <span>-{money(cryptoDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400 pt-1">
                    <span>GST (10% Included)</span>
                    <span>{money(gstInclusiveAmount)}</span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-slate-800">
                    <span>Total Amount (AUD)</span>
                    <span className="text-emerald-400 text-lg">{money(finalTotal)}</span>
                  </div>
                </div>

                {/* Free Shipping Alert Bar */}
                {!isFreeShipping && (
                  <div className="mt-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>
                      Add <strong>{money(SHOP.freeShippingThreshold - subtotal)}</strong> more for Free Express Courier Delivery across Australia!
                    </span>
                  </div>
                )}
              </div>

              {/* Showroom & Support Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-xs space-y-2 text-slate-400">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Brunswick Showroom Pickup & Support</span>
                </div>
                <p>
                  Questions about your order specs or delivery timeframe? Contact our Melbourne team on <strong>{CONTACT.phone}</strong> or visit us at {CONTACT.address}.
                </p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
