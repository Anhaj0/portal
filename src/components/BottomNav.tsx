'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Search, ShoppingBag, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
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
    <nav className="fixed bottom-0 inset-x-0 mx-auto w-full max-w-md bg-white px-8 py-4 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        const isCart = item.name === 'Cart';

        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center relative group gap-1"
          >
            <div className="relative p-1">
              <Icon
                className={`w-6 h-6 transition-colors duration-200
                  ${isActive
                    ? 'text-[#F37A20] fill-[#F37A20]' // Active: Orange & Filled
                    : 'text-black stroke-[1.5px]'     // Inactive: Black Line
                  }
                `}
              />

              {isCart && cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white translate-x-1 -translate-y-1"></span>
              )}
            </div>

            <span className={`text-[10px] font-medium ${isActive ? 'text-[#F37A20]' : 'text-black'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
