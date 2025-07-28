import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold mb-8">
        Y.W.Y.L.
      </h1>
      <Link className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        href="./tasks"
      >
        MyTask
      </Link>
    </main>
  );
}
