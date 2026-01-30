'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Search, ShoppingBag, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BottomNav() {
    const pathname = usePathname();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Poll cart count
        const fetchCart = async () => {
            try {
                const res = await fetch('/api/cart');
                if (res.ok) {
                    const data = await res.json();
                    const count = data.reduce((acc: number, item: any) => acc + item.quantity, 0);
                    setCartCount(count);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchCart();
        // Simple interval to keep it updated nicely in this demo without websockets/context
        const interval = setInterval(fetchCart, 2000);
        return () => clearInterval(interval);
    }, [pathname]);

    const navItems = [
        { name: 'Home', href: '/', icon: House },
        { name: 'Search', href: '/search', icon: Search },
        { name: 'Cart', href: '/cart', icon: ShoppingBag },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <nav className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-md bg-white px-8 py-5 flex justify-between items-center z-50">
            {/* 
         Removed border-t and shadow based on the "floating" clean look in reference, 
         or kept basic white bg. The reference shows a very clean bar.
      */}
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                const isCart = item.name === 'Cart';

                // Style Logic:
                // Active Home: Solid Orange Icon (filled)
                // Inactive: Thin Black/Grey Line Icon

                // Note: Lucide icons fill with 'fill-current'.
                // For Home active: set color to orange, fill to orange.
                // For others inactive: set color to dark grey/black.

                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex flex-col items-center justify-center relative group"
                    >
                        <div className="relative p-1">
                            <Icon
                                className={`w-6 h-6 transition-colors duration-200
                  ${isActive
                                        ? 'text-[#F37A20] fill-[#F37A20]' // Active: Orange & Filled
                                        : 'text-gray-500 stroke-[2px]'    // Inactive: Grey Line
                                    }
                `}
                            />

                            {/* Cart Badge - Red Dot */}
                            {isCart && cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white translate-x-1 -translate-y-1"></span>
                            )}
                        </div>
                        {/* Label - showing label based on active state or always? 
                Reference often adds a small label for active, but request says "Icons...". 
                I will show small labels as per previous design but focus on icon style.
                Actually, reference screenshot "Home" has "Home" text colored orange below it!
                Wait, looking at the provided reference image "Home" bottom bar:
                - Home icon is Orange Filled + Text "Home" Orange.
                - Search is Icon Only (Grey).
                - Cart is Icon Only (Grey) + Red Dot.
                - Settings is Icon Only (Grey).
            */}
                        {isActive && (
                            <span className="text-[10px] font-bold mt-1 text-[#F37A20]">
                                {item.name}
                            </span>
                        )}
                        {!isActive && (
                            <span className="text-[10px] font-medium mt-1 text-gray-400 group-hover:text-gray-600">
                                {item.name}
                            </span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
