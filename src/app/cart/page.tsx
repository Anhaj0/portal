'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/types';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch('/api/cart')
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setProcessing(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
      const data = await res.json();

      if (data.success) {
        // In a real app we might pass the orderId or clear cart here
        router.push('/checkout');
      } else {
        alert('Checkout failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error processing order');
    } finally {
      setProcessing(false);
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 12.00;
  const totalPayment = subtotal + deliveryFee;

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-gray-500">Loading cart...</div>;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white px-4 py-4 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <span className="text-sm font-medium text-gray-500 mx-auto pr-8">Cart</span>
      </header>

      <main className="flex-1 px-6 overflow-hidden">
        <h1 className="text-2xl font-bold text-black mt-2">My Orders</h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
            <ShoppingBag className="w-16 h-16 opacity-20" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {cartItems.map((item, idx) => (
              // Swipe container
              <div key={`${item.id}-${idx}`} className="group relative w-full overflow-hidden">
                <div className="flex w-full overflow-x-auto no-scrollbar snap-x snap-mandatory">
                  {/* Main Content - Snap Area */}
                  <div className="min-w-full flex items-center gap-4 snap-center bg-white pr-4">
                    <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-[#F3E6D8] shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-black">{item.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.selectedColor ? 'Yellow' : 'Yellow'}
                      </p>
                      <p className="text-xs text-gray-400">Size {item.selectedSize}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-black text-sm">${item.price.toFixed(2)}</span>
                        <span className="text-sm text-black">{item.quantity}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Drawer - Snap Area */}
                  <div className="flex items-center snap-center pl-4">
                    <div className="flex items-center h-12 bg-[#F37A20] rounded-l-[2rem] px-2">
                      <button className="w-10 h-10 flex items-center justify-center text-white">
                        <Heart className="w-5 h-5" />
                      </button>
                      <div className="w-[1px] h-6 bg-white/20 mx-1"></div>
                      <button className="w-10 h-10 flex items-center justify-center text-white">
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="w-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {cartItems.length > 0 && (
        <div className="bg-white px-6 pb-8 pt-6">
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Total Items ({totalItems})</span>
              <span className="text-black font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Delivery</span>
              <span className="text-black font-semibold">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 text-black font-semibold">
              <span>Total Payment</span>
              <span>${totalPayment.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={processing}
            className="mt-6 w-full bg-[#F37A20] text-white font-bold py-3.5 rounded-full shadow-orange-200 shadow-lg active:scale-95 transition-transform disabled:opacity-70"
          >
            {processing ? 'Processing...' : 'Checkout Now'}
          </button>
        </div>
      )}
    </div>
  );
}
