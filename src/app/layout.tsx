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
            <div className="flex-1 min-h-0">
                {children}
            </div>
            <Navbar className="h-12 z-100"/>
        </body>
    </html>
);
}