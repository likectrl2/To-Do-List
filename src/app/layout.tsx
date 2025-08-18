"use client";

import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='zh'
      className='h-full'
    >
      <body className='h-full overflow-hidden'>{children}</body>
    </html>
  );
}
