import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { GalleryProvider } from "@/src/lib/GalleryContext";

export const metadata: Metadata = {
  title: "Otomoro Competition",
  description: "Image Gallery - by Hamza Sabil",
};

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <GalleryProvider>
            {children}
        </GalleryProvider>
      </body>
    </html>
  );
}
