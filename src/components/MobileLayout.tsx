import React from 'react';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full bg-gray-200 flex justify-center items-start lg:items-center p-0 lg:p-4">
            {/* Mobile container: restricted max-width, shadow, clean background */}
            <div className="w-full max-w-md min-h-screen bg-white shadow-2xl relative overflow-x-hidden flex flex-col">
                {children}
            </div>
        </div>
    );
}
