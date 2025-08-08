"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface CheckboxPara extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    className?: string;
    disabled?: boolean;
}

export default function Checkbox({className, checked, disabled, ...props}: CheckboxPara) {
    return (
        <label className={cn("aspect-square transition relative rounded-sm", { "hover:text-green-800" : !disabled }, { "bg-green-800 text-green-800" : checked }, className)}>
            <input
                type="checkbox"
                checked={checked}
                className="h-0 w-0 absolute"
                disabled={disabled}
                {...props}
            />  
            <svg viewBox="0 0 100 100" className="h-auto aspect-square rounded-sm absolute">
                <rect width="100" height="100" fill="transparent" stroke="currentColor" strokeWidth="30" rx="30" ry="30"></rect>
            </svg>
            {
                checked && <svg viewBox="0 0 100 100" className={cn("h-auto aspect-square rounded-sm absolute", checked ? "text-neutral-50" : "")}>
                    <path d="M 20,50 L 40,75 L 80,25" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
            }
        </label>
    )
}