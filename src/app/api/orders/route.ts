import { NextResponse } from 'next/server';
import { CartItem } from '@/types';

// Use global variable to access the shared cart state
const globalForCart = global as unknown as { cartStore: CartItem[] };
if (!globalForCart.cartStore) globalForCart.cartStore = [];

export async function POST() {
    // Simulate payment processing delay logic
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Action: clear the in-memory cart array
    globalForCart.cartStore = [];

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    return NextResponse.json({
        success: true,
        orderId,
    });
}
