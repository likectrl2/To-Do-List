"use client";

import { motion } from 'framer-motion';

export default function Home() {
    return (
        <main className="h-full   flex justify-center items-center">
            <motion.h1 
                className="scale-200 [text-shadow:0_0_2px_#3399ff,0_0_5px_#3399ff,0_0_10px_#3399ff,0_0_25px_#3399ff,0_0_40px_#3399ff]"
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "tween", duration: 1 }}
            >
                D.W.Y.L.
            </motion.h1>
        </main>
    );
}