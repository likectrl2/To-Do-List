"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

interface InputTextPara extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    className?: string;
}

export default function InputText({className, ...props}: InputTextPara) {
    return (
        <input
            type="text"
            className={cn("border-0 outline-0", className)}
            placeholder="请输入文本"
            {...props}
        />
    )
}