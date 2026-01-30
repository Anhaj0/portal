import { NextRequest, NextResponse } from 'next/server';
import products from '@/data/products.json';
import { CartItem } from '@/types';

// Use global variable to share state with the orders route
const globalForCart = global as unknown as { cartStore: CartItem[] };
if (!globalForCart.cartStore) globalForCart.cartStore = [];

export async function GET() {
    return NextResponse.json(globalForCart.cartStore);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { productId, quantity, selectedSize, selectedColor } = body;

        // Validation
        if (!productId || !quantity || !selectedSize || !selectedColor) {
            return NextResponse.json(
                { error: 'Missing required fields: productId, quantity, selectedSize, selectedColor' },
                { status: 400 }
            );
        }

        const product = products.find((p) => p.id === productId);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Check if item already exists in cart with same size and color to merge
        const existingItemIndex = globalForCart.cartStore.findIndex(
            (item) =>
                item.id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
        );

        if (existingItemIndex > -1) {
            globalForCart.cartStore[existingItemIndex].quantity += quantity;
        } else {
            const newItem: CartItem = {
                ...product,
                selectedSize,
                selectedColor,
                quantity,
            };
            globalForCart.cartStore.push(newItem);
        }

        return NextResponse.json(globalForCart.cartStore);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
