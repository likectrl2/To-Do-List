"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavbarPara {
    className?: string;
}

export default function Navbar({className}: NavbarPara) {
    return (
        <nav className={cn("bg-neutral-900 border-t-1 border-neutral-500 flex", className)}>
            <Link href='./planManager' className="h-full aspect-square p-1 place-content-center text-center">H</Link>
        </nav>
    )
}