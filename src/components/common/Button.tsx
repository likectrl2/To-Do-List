"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from 'react';
import { motion, MotionProps, TargetAndTransition } from 'framer-motion';

interface ButtonPara extends 
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>,
    MotionProps 
{
    whileHover?: TargetAndTransition
    whileTap?: TargetAndTransition
}

export default function Button({className, children, whileHover, whileTap, ...props}: ButtonPara) {

    return (
            <motion.button
                className={cn(
                    "rounded-sm p-1 cursor-pointer",
                    "flex justify-center items-center",
                    className
                )}
                whileHover={{
                    backgroundColor: "#525252",
                    ...whileHover,
                    transition:{ type: "tween", duration: 0.05, ease: "easeInOut" },
                    ...whileHover?.transition ?? null
                }}
                whileTap={{ 
                    scale: 0.9,
                    ...whileTap,
                    transition: { type: "spring", stiffness: 400, damping: 40 },
                    ...whileTap?.transition ?? null
                }}
                {...props}
            >
                {children}
            </motion.button>
    )
}