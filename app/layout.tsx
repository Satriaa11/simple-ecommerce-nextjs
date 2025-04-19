import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { WebNavbar } from "@/components/navbar/web-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple E-commerce",
  description: "Simple E-commerce website built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white">
      <body className={inter.className}>
        <WebNavbar />
        <main >{children}</main>
      </body>
    </html>
  );
}
