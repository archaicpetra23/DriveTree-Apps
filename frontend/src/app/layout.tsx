import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DriveTree — BST File Directory Manager",
  description:
    "Aplikasi web simulasi file directory manager berbasis Binary Search Tree (BST). Kelola file dengan operasi insert, search, delete, dan visualisasi tree interaktif.",
  keywords: ["BST", "Binary Search Tree", "File Manager", "Struktur Data", "DriveTree"],
  authors: [{ name: "DriveTree Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
