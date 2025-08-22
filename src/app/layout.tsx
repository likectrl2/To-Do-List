"use client";

import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='zh'
      className='h-full'
    >
      <body className='flex h-full flex-col overflow-hidden'>
        {children}
        <nav className='bg-background-1 border-background-2 h-12 border-2'>
          <Link
            href='./inbox'
            className='hover:bg-background-2 flex aspect-square h-full items-center justify-center'
          >
            H
          </Link>
        </nav>
      </body>
    </html>
  );
}
