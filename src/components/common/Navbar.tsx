"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useState } from 'react';

interface NavbarPara {
    className?: string;
}

export default function Navbar({className}: NavbarPara) {
    const [selectedPage, setSelectedPage] = useState<number>(0);

    function isSelected(key: number) {
        return key === selectedPage
    }

    return (
        <nav className={cn("bg-neutral-900 border-t-1 border-neutral-500 flex", className)}>
            <span className="h-full aspect-square flex" onClick={() => setSelectedPage(1)}>
                <motion.span
                    className="h-auto aspect-square m-2 rounded-sm flex"
                    whileHover={{ backgroundColor: "#404040", scale: 1.08 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ backgroundColor: isSelected(1) ? "#404040" : "#171717"}}
                >
                    <Link href='./planManager' className="flex-1 place-content-center text-center">H</Link>
                </motion.span>
            </span>
        </nav>
    )
}