import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import MobileLayout from "@/components/MobileLayout";
import BottomNavWrapper from "@/components/BottomNavWrapper";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "PortalShop",
  description: "Mobile-first e-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <MobileLayout>
          {children}
          <BottomNavWrapper />
        </MobileLayout>
      </body>
    </html>
  );
}
