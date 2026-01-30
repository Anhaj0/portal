import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingBag } from 'lucide-react';

const variantStyles = {
  tall: 'h-[220px]',
  short: 'h-[185px]',
};

interface ProductCardProps {
  product: Product;
  variant?: 'tall' | 'short';
}

export default function ProductCard({ product, variant = 'tall' }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="relative mb-2">
        <div className={`relative w-full overflow-hidden rounded-2xl bg-[#F3E6D8] ${variantStyles[variant]}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-0 right-0 flex items-center justify-center w-9 h-9 bg-black rounded-full z-10 p-2 border-4 border-white translate-x-[-35%] translate-y-[55%]">
          <ShoppingBag className="w-full h-full text-white" strokeWidth={2.5} />
        </div>
      </div>

      <div className="px-1">
        <h3 className="text-sm font-bold text-black leading-tight">${product.price.toFixed(2)}</h3>
        <p className="text-[11px] text-gray-500 truncate mt-0.5">{product.name}</p>
      </div>
    </Link>
  );
}
