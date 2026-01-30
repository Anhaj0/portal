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
            {/* 
        Changes:
        - Removed bg-gray-100 from container
        - Image provides the background (assumed to be part of the image or white)
        - Bag icon: Solid black circle, white icon, overlapping image bottom-right
      */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl mb-2">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-top"
                />
                <div className="absolute bottom-2 right-2 flex items-center justify-center w-8 h-8 bg-black rounded-full shadow-md z-10 p-2">
                    <ShoppingBag className="w-full h-full text-white" strokeWidth={2.5} />
                </div>
            </div>

            {/* Tightened vertical spacing */}
            <div className="px-1">
                <h3 className="text-base font-bold text-black leading-tight">${product.price.toFixed(2)}</h3>
                <p className="text-xs text-gray-500 truncate mt-0.5">{product.name}</p>
            </div>
        </Link>
    );
}
