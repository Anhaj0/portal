'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bookmark, Star } from 'lucide-react';
import { Product } from '@/types';

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            const res = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    quantity: 1,
                    selectedSize,
                    selectedColor,
                }),
            });

            if (res.ok) {
                alert('Added to cart');
                router.push('/cart');
            } else {
                alert('Failed to add to cart');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col relative">
            {/* Hero Image Section */}
            <div className="relative w-full h-[50vh] bg-gray-100">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-top"
                    priority
                />

                {/* Header Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                    <button
                        onClick={() => router.back()}
                        className="p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition"
                    >
                        <ChevronLeft className="w-5 h-5 text-black" />
                    </button>
                    <button
                        className="p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition"
                    >
                        <Bookmark className="w-5 h-5 text-black" />
                    </button>
                </div>

                {/* Image Pagination Dots (Mock) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <div className="w-6 h-1.5 bg-white rounded-full shadow-sm"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                </div>
            </div>

            {/* Details Section */}
            <div className="flex-1 -mt-6 bg-white rounded-t-3xl relative z-20 px-6 pt-8 pb-24 flex flex-col gap-6">

                {/* Title & Rating */}
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-black leading-tight">{product.name}</h1>
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-black">4.8</span>
                            <span className="text-sm text-gray-400">(2.6k+ review)</span>
                        </div>
                    </div>
                    {/* Color Selector (Small preview aligned with title in some designs, or separate. 
              Screenshot "Details" shows Product Name then Size then Price/Button. 
              Color is usually somewhere. I'll put it where it fits best or following standard.)
              Wait, screenshot shows Color circles on the right of the Title! 
          */}
                    <div className="flex gap-2 mt-1">
                        {product.colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === color ? 'border-gray-900 scale-110' : 'border-transparent'
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-3">
                    <h3 className="text-base font-bold text-black">Size</h3>
                    <div className="flex gap-4">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                  ${selectedSize === size
                                        ? 'bg-black text-white shadow-lg'
                                        : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-auto pt-6 flex items-center justify-between gap-6">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400">Price</span>
                        <span className="text-2xl font-bold text-black">${product.price.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 bg-[#F37A20] text-white font-bold py-4 px-8 rounded-full shadow-orange-200 shadow-xl active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isAdding ? 'Adding...' : 'Add To Cart'}
                    </button>
                </div>

            </div>
        </div>
    );
}
