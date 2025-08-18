import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

interface NavProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Nav({ className, ...props }: NavProps) {
  return (
    <nav
      className={cn("bg-background-2 flex flex-col gap-1", className)}
      {...props}
    >
      <Link href='./inbox'>Inbox</Link>
      <Link href='./plan'>Plans</Link>
      <Link href='./schedule'>Schedule</Link>
      <Link href='./data'>Data</Link>
    </nav>
  );
}
