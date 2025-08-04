"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, Children, ReactNode } from 'react';

interface ButtonPara extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children? : ReactNode;
}

export default function Button({className, children, ...props}: ButtonPara) {
    return (
        <button
            className={cn("aspect-square p-1 content-center text-center", className)}
            {...props}
        >
            {children}
        </button>
    )
}