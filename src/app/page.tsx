import Image from 'next/image';
import Link from 'next/link';
import { LayoutGrid, User } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { Product } from '@/types';

const products: Product[] = productsData;
const categories = ['All', 'Men', 'Women', 'Kids', 'Other'];
const leftProducts = products.filter((_, index) => index % 2 === 0);
const rightProducts = products.filter((_, index) => index % 2 === 1);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm px-5 py-4 flex justify-between items-center">
        <button className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <LayoutGrid className="w-6 h-6 text-black" />
        </button>
        <Link href="/onboarding" className="p-2 -mr-2 hover:bg-gray-100 rounded-full">
          <User className="w-6 h-6 text-black" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black tracking-tight">Explore</h1>
          <p className="text-gray-400 text-sm mt-1">Best trendy collection!</p>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6">
          {categories.map((cat, index) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap
                ${index === 0
                  ? 'bg-[#F37A20] text-white shadow-lg shadow-orange-200'
                  : 'text-gray-500 hover:text-black'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>



        {/* Product Grid */}
        <div className="flex gap-4">
          <div className="flex flex-1 flex-col gap-6">
            {leftProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={index % 2 === 1 ? 'short' : 'tall'}
              />
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-6">
            {rightProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={index % 2 === 0 ? 'short' : 'tall'}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
