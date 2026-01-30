'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white px-4 py-4 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <span className="text-sm font-medium text-gray-500 mx-auto pr-8">Checkout</span>
      </header>

      <main className="flex-1 px-6">
        <div className="mt-2 space-y-6">
          <div>
            <p className="text-xs text-gray-400">Delivery Address</p>
            <div className="mt-3 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                  <span>📍</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">25/3 Housing Estate,</p>
                  <p className="text-sm font-semibold text-black">Sylhet</p>
                </div>
              </div>
              <button className="text-xs text-gray-400">Change</button>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <span>🕒</span>
              <p>Delivered in next 7 days</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-4">Payment Method</p>
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
              <div className="relative w-12 h-8">
                <Image src="/images/visa.svg" alt="Visa" fill className="object-contain" />
              </div>
              <div className="relative w-12 h-8">
                <Image src="/images/mastercard.svg" alt="Mastercard" fill className="object-contain" />
              </div>
              <div className="relative w-12 h-8">
                <Image src="/images/paypal.svg" alt="Paypal" fill className="object-contain" />
              </div>
              <div className="relative w-12 h-8">
                <Image src="/images/apple-pay.svg" alt="Apple Pay" fill className="object-contain" />
              </div>
            </div>
          </div>

          <div>
            <button className="w-full bg-[#FAFAFA] py-4 rounded-2xl text-[10px] text-gray-500 font-medium">
              Add Voucher
            </button>
          </div>

          <div className="text-xs text-red-400 leading-relaxed">
            <p>Note : Use your order id at the payment. Your Id</p>
            <p>#154619 if you forget to put your id we can&apos;t confirm the payment.</p>
          </div>
        </div>
      </main>

      <div className="px-6 pb-8 pt-6">
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex justify-between">
            <span>Total Items (3)</span>
            <span className="text-black font-semibold">$116.00</span>
          </div>
          <div className="flex justify-between">
            <span>Standard Delivery</span>
            <span className="text-black font-semibold">$12.00</span>
          </div>
          <div className="flex justify-between pt-3 text-black font-semibold">
            <span>Total Payment</span>
            <span>$126.00</span>
          </div>
        </div>

        <button className="mt-6 w-full bg-[#F37A20] text-white font-bold py-3.5 rounded-full shadow-orange-200 shadow-lg active:scale-95 transition-transform">
          Pay Now
        </button>
      </div>
    </div>
  );
}
