"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className='page'>
      <Link href='./inbox'>Inbox</Link>
      <h1>D.W.Y.L.</h1>
    </div>
  );
}
