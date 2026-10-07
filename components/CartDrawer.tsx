'use client';

import { useState, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { SITE, SHOP } from '@/config/site';
import { money } from '@/lib/order';

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Sync cart from localStorage
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
  const totalAmount = subtotal + shippingCost;

  if (!isOpen) return null;

  const handleProceedToCheckout = () => {
    onClose();
    window.location.href = '/checkout/';
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-slate-900 text-slate-100 shadow-2xl flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600/20 rounded-lg text-emerald-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-white">Your Cart</h2>
                <p className="text-xs text-slate-400">{items.reduce((acc, i) => acc + i.quantity, 0)} items selected</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close cart drawer"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Shipping Progress Bar */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  {isFreeShipping ? (
                    <span className="text-emerald-400 font-bold">Free Express Courier Freight Unlocked!</span>
                  ) : (
                    `Add ${money(SHOP.freeShippingThreshold - subtotal)} for Free Express Shipping`
                  )}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / SHOP.freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium">Your cart is empty.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                >
                  Browse Electric Bikes
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-center gap-3.5 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80"
                  >
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1">
                      <img
                        src={item.image || 'https://picsum.photos/seed/ieb-bike/200/150'}
                        alt={item.name}
                        className="object-contain max-h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-xs text-emerald-400 font-extrabold mt-0.5">{money(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.slug, -1)}
                          className="p-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white w-5 text-center">{item.quantity}</span>
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
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Min Order Warning */}
            {items.length > 0 && !isMinOrderMet && (
              <div className="bg-amber-950/40 border border-amber-800/60 p-3.5 rounded-xl text-xs text-amber-200">
                ⚠️ Minimum order requirement is <strong>{money(SHOP.minOrder)}</strong>. Please add <strong>{money(SHOP.minOrder - subtotal)}</strong> more to proceed to checkout.
              </div>
            )}
          </div>

          {/* Footer Totals & Proceed Button */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Freight</span>
                  <span>{isFreeShipping ? <span className="text-emerald-400 font-bold">FREE</span> : money(SHOP.shippingFee)}</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px] pt-1">
                  <span>GST Status</span>
                  <span>10% GST Included</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-emerald-400">{money(totalAmount)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                type="button"
                disabled={!isMinOrderMet}
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-900/40 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Secure Checkout · Direct Bank Transfer, PayID & Crypto</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
