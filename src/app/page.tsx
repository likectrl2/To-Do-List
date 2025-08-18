"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className='page flex items-center justify-center'>
      <motion.h1
        className='text-3xl drop-shadow-[0_0_10px_#ffffff,0_0_40px_#ffffff]'
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { type: "tween", duration: 2, delay: 0.6 },
          default: { type: "tween", duration: 2 },
        }}
      >
        D.W.Y.L.
      </motion.h1>
    </main>
  );
}
