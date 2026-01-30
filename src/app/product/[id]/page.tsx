import { notFound } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import productsData from '@/data/products.json';
import { Product } from '@/types';

// Server Component
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = (productsData as Product[]).find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return <ProductDetails product={product} />;
}
