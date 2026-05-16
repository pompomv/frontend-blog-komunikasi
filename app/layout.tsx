import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Komunikasi Bisnis",
  description: "Panduan komprehensif menguasai komunikasi tertulis di dunia kerja.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        
        {/* Navbar Global */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
                  Kombis<span className="text-gray-900">Blog</span>.
                </Link>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                  Beranda
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                  Kategori Materi
                </Link>
                <Link href="#" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                  Tentang Penulis
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Konten Utama (Beranda / Detail Artikel akan dirender di sini) */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Footer Global */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} KombisBlog. Ditulis dengan Next.js & Tailwind.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                {/* Anda bisa mengganti ini dengan ikon sungguhan nanti */}
                𝕏
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                in
              </a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}