'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Search, ShoppingBag, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BottomNav() {
    const pathname = usePathname();
    const [cartCount, setCartCount] = useState(0);

    // Bonus: Fetch actual cart count for the badge
    useEffect(() => {
        // Simple polling or fetch on mount to get badge count. 
        // In a real app, this would use a Context or React Query.
        const fetchCart = async () => {
            try {
                const res = await fetch('/api/cart');
                if (res.ok) {
                    const data = await res.json();
                    // Assuming count is total items, or just number of unique items
                    const count = data.reduce((acc: number, item: any) => acc + item.quantity, 0);
                    setCartCount(count);
                }
            } catch (e) {
                console.error('Failed to fetch cart count', e);
            }
        };

        fetchCart();
    }, [pathname]); // Refresh on route change

    const navItems = [
        { name: 'Home', href: '/', icon: House },
        { name: 'Search', href: '/search', icon: Search },
        { name: 'Cart', href: '/cart', icon: ShoppingBag },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    // Optional: Hide nav on product details if strictly following "fullscreen" feel,
    // but requirements were to "ensure... padding... so nav bar doesn't cover", implying it's always there.

    return (
        <nav className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-md bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center gap-1 transition-colors relative
              ${isActive ? 'text-[#F37A20]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <div className="relative">
                            <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />

                            {/* Cart Badge */}
                            {item.name === 'Cart' && cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </div>
                        {/* Optional Label (can hide for minimal look, but keeps accessibility) */}
                        <span className="text-[10px] font-medium">{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
