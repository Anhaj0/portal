'use client';

import { usePathname } from 'next/navigation';
import BottomNav from '@/components/BottomNav';

const navPaths = new Set(['/', '/search', '/settings']);

export default function BottomNavWrapper() {
  const pathname = usePathname();
  if (!navPaths.has(pathname)) {
    return null;
  }
  return <BottomNav />;
}
