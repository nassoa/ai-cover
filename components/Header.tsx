import Link from "next/link";
import { PenLine } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <h1 className="sm:text-3xl text-2xl font-bold ml-2 tracking-tight flex items-center gap-4">
          <PenLine className="w-7 h-7" />
          Ai-Cover
        </h1>
      </Link>
      {/* <p className="border rounded-2xl py-1 px-4 text-slate-500 text-sm hover:scale-105 transition duration-300 ease-in-out">
        <b>48,325</b> lettres de motivation générées
      </p> */}
    </header>
  );
}
