import { LayoutGrid, User, Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import productsData from '@/data/products.json';
import { Product } from '@/types';

// In a real scenario, we might fetch this from the API, but importing JSON directly 
// is safer for this dev environment to avoid localhost fetch issues during SSG/SSR.
const products: Product[] = productsData;

// Categories for the horizontal pill list
const categories = ['All', 'Men', 'Women', 'Kids', 'Other'];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md px-4 py-4 flex justify-between items-center">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <LayoutGrid className="w-6 h-6 text-black" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <User className="w-6 h-6 text-black" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 space-y-6">

        {/* Title Section */}
        <div className="space-y-1 mt-2">
          <h1 className="text-3xl font-bold text-black tracking-tight">Explore</h1>
          <p className="text-gray-500 text-sm">Best trendy collection!</p>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat, index) => (
            <button
              key={cat}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                ${index === 0
                  ? 'bg-[#F37A20] text-white shadow-md shadow-orange-200'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Bottom Navigation (Optional but makes it feel like an app app) 
          Not explicitly requested but usually standard. I'll stick to not adding it 
          unless requested to avoid clutter, as the prompt didn't ask for a global nav bar. 
      */}
    </div>
  );
}
