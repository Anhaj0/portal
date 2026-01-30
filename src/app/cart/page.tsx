'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Trash2, ShoppingBag } from 'lucide-react';
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
                body: JSON.stringify({ items: cartItems }), // API just clears cart, doesn't really use body logic yet based on prompt
            });
            const data = await res.json();

            if (data.success) {
                alert(`Order Placed: ${data.orderId}`);
                router.push('/');
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

    // Calculations
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = 12.00;
    const totalPayment = subtotal + deliveryFee;

    if (loading) {
        return <div className="min-h-screen grid place-items-center text-gray-500">Loading cart...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
                <button
                    onClick={() => router.back()}
                    className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
                >
                    <ChevronLeft className="w-6 h-6 text-black" />
                </button>
                <span className="text-lg font-bold text-black mx-auto pr-8">My Orders</span>
            </header>

            {/* Content */}
            <main className="flex-1 p-4 pb-48">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
                        <ShoppingBag className="w-16 h-16 opacity-20" />
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="bg-white p-3 rounded-2xl flex gap-4 shadow-sm">
                                <div className="relative w-24 h-28 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={item.images[0]}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="font-bold text-black text-sm">{item.name}</h3>
                                        <p className="text-xs text-gray-400 mt-1">
                                            Size {item.selectedSize} • <span style={{ color: item.selectedColor }}>Color</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <span className="font-bold text-black text-lg">${item.price.toFixed(2)}</span>
                                        <span className="font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md text-xs">
                                            {item.quantity}x
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Checkout Footer */}
            {cartItems.length > 0 && (
                <div className="bg-white fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto p-6 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-500 text-sm opacity-80">
                            <span>Total Items ({totalItems})</span>
                            <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm opacity-80">
                            <span>Standard Delivery</span>
                            <span className="font-medium text-black">${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-black font-bold text-lg pt-2 border-t border-gray-100">
                            <span>Total Payment</span>
                            <span>${totalPayment.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={processing}
                        className="w-full bg-[#F37A20] text-white font-bold py-4 rounded-full shadow-orange-200 shadow-xl active:scale-95 transition-transform disabled:opacity-70"
                    >
                        {processing ? 'Processing...' : 'Checkout Now'}
                    </button>
                </div>
            )}
        </div>
    );
}
