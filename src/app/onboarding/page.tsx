'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-white px-6 pt-10 pb-8 flex flex-col">
      <span className="text-xs text-gray-300 tracking-wide">Onboarding</span>

      <div className="mt-5 rounded-[32px] bg-[#E8D9CC] p-3">
        <div className="relative w-full aspect-[3/4] rounded-[28px] overflow-hidden">
          <Image
            src="/images/onboarding.svg"
            alt="Fashion portrait"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="mt-7">
        <h1 className="text-3xl font-bold text-black leading-tight">
          Find The
          <br />
          Best Collections
        </h1>
        <p className="text-sm text-gray-400 mt-3">
          Get your dream item easily with FashionHub
          and get other interesting offer
        </p>
      </div>

      <div className="mt-auto pt-8 flex items-center gap-4">
        <Link
          href="/signup"
          className="flex-1 text-center border border-gray-200 text-black font-semibold py-3 rounded-full"
        >
          Sign Up
        </Link>
        <Link
          href="/"
          className="flex-1 text-center bg-[#F37A20] text-white font-semibold py-3 rounded-full shadow-orange-200 shadow-lg"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
