import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D.W.Y.L.",
  description: "Tool to fulfill your life",
};

export default function RootLayout({
  children,
}: Readonly<
    {children: React.ReactNode;}
  >) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
