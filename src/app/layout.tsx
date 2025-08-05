import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";

export const metadata: Metadata = {
  title: "D.W.Y.L.",
  description: "Tool to fulfill your life",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        {children}
        <Navbar className="h-10 w-full"/>
      </body>
    </html>
  );
}