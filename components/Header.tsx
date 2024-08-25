"use client";

import Link from "next/link";

export default function Header({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
      <Link className="text-2xl font-bold" href="/products">Eteration</Link>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-md text-black"
        />
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-700 px-4 py-2 rounded-md">Kerem</button>
        </div>
    </header>
  );
}
