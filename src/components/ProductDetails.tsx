'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bookmark } from 'lucide-react';
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
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-white px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <span className="text-sm font-medium text-gray-500">Details</span>
        <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
          <Bookmark className="w-5 h-5 text-black" />
        </button>
      </header>

      <div className="px-6">
        <div className="relative w-full aspect-[1/1] rounded-[28px] overflow-hidden bg-[#F3E6D8]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-24 flex flex-col gap-5">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-black leading-tight">
            {product.name.split(' ').slice(0, 2).join(' ')}
            <br />
            {product.name.split(' ').slice(2).join(' ')}
          </h1>
          <div className="flex gap-2 mt-1">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-5 h-5 rounded-full border ${selectedColor === color ? 'border-black' : 'border-gray-200'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-black">Size</h3>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-colors
                  ${selectedSize === size
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-500 border border-gray-200'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="text-2xl font-bold text-black">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 bg-[#F37A20] text-white font-bold py-3.5 rounded-full shadow-orange-200 shadow-lg active:scale-95 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAdding ? 'Adding...' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
