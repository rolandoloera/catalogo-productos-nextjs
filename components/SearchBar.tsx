"use client";

import { useState } from "react";
import { Producto } from "@/types/product";

interface SearchBarProps {
  productos: Producto[];
  onFilter: (filtered: Producto[]) => void;
}

export default function SearchBar({ productos, onFilter }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(term.toLowerCase()) ||
        producto.descripcion?.toLowerCase().includes(term.toLowerCase())
    );
    onFilter(filtered);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none text-gray-800 placeholder-gray-400"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              onFilter(productos);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

