import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="relative w-full mb-3">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-[#F3E6D8]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 flex items-center justify-center w-10 h-10 bg-black rounded-full shadow-xl z-10 p-2.5 border-4 border-white">
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
