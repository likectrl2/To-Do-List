"use client";

import { useSwipeable } from "react-swipeable";
import "./globals.css";
import { useState } from "react";
import Nav from "@/components/nav/Nav";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const swipHandlerPage = useSwipeable({
    onSwipedRight: (e) => {
      if ((e.initial[0] / window.innerWidth) * 100 < 10) setIsSidebarOpen(true);
    },
  });
  const swipHandlerNav = useSwipeable({
    onSwipedLeft: () => setIsSidebarOpen(false),
  });

  return (
    <html
      lang='zh'
      className='h-full'
    >
      <body
        className='relative h-full overflow-hidden'
        {...swipHandlerPage}
      >
        {isSidebarOpen && (
          <>
            <div
              className='fixed inset-0 z-20 bg-black/40'
              onClick={() => setIsSidebarOpen(false)}
            />
            <Nav
              className='fixed top-0 left-0 z-30 h-full w-[55%] bg-white'
              {...swipHandlerNav}
            />
          </>
        )}
        <div className=''>{children}</div>
      </body>
    </html>
  );
}
