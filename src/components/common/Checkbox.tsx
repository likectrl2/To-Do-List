"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface CheckboxPara extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    className?: string;
}

export default function Checkbox({className, ...props}: CheckboxPara) {
    return (
        <input
            type="checkbox"
            className={cn("aspect-square p-1", className)}
            {...props}
        />
    )
}