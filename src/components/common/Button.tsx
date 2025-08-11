"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from 'react';
import { motion, MotionProps, TargetAndTransition } from 'framer-motion';

interface ButtonPara extends 
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>,
    MotionProps
{
    whileHover?: TargetAndTransition;
}

export default function Button({className, children, whileHover, ...props}: ButtonPara) {

    return (
            <motion.button
                className={cn("rounded-sm cursor-pointer", className)}
                whileHover={
                    {
                        backgroundColor: "#525252",
                        transition:{ type: "tween", duration: 0.1, ease: "easeInOut" },
                        ...whileHover
                    }
                }
                whileTap={
                    { 
                        scale: 0.9,
                        transition: { type: "spring", stiffness: 400, damping: 40 },
                        ...whileHover
                    }
                }
                {...props}
            >
                {children}
            </motion.button>
    )
}