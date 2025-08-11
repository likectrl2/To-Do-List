"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from 'framer-motion';

type LinkStruct = { icon: string, href: string };

function NavLinkButton({link}: {link: LinkStruct}) {
    return (
        <motion.span
            className="h-full aspect-square rounded-sm flex justify-center items-center"
            whileHover={
                { 
                    backgroundColor: "#525252",
                    transition: {
                        type: "tween", duration: 0.1, ease: "easeInOut"
                    }
                }
            }
            whileTap={
                {
                    scale: 0.9,
                    transition: { type: "spring", stiffness: 400, damping: 40 },
                }
            }
        >
            <Link href={link.href}>
                {link.icon}
            </Link>
        </motion.span>
    )
}

interface NavbarPara {
    className: string;
}

const linkList: LinkStruct[] = [
    { icon: "H", href: "./planManager" }
]

export default function Navbar({className}: NavbarPara) {
    return (
        <nav className={cn("bg-neutral-900 border-t-1 border-neutral-600 p-2 flex gap-2", className)}>
            {
                linkList.map(
                    l => <NavLinkButton key={l.href} link={l}/>
                )
            }
        </nav>
    )
}