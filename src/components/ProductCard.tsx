import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} className="group block">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md z-10">
                    <ShoppingBag className="w-4 h-4 text-black" />
                </div>
            </div>
            <div className="mt-3 space-y-1">
                <h3 className="text-sm font-medium text-black">${product.price.toFixed(2)}</h3>
                <p className="text-xs text-gray-500 truncate">{product.name}</p>
            </div>
        </Link>
    );
}
