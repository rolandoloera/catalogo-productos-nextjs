"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Producto } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        setLoading(true);
        const data = await api.getProductos();
        setProductos(data);
        setFilteredProductos(data);
      } catch (err) {
        setError("Error al cargar productos. Por favor, intenta más tarde.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  const handleFilter = (filtered: Producto[]) => {
    setFilteredProductos(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🛍️ Mi Catálogo
              </h1>
              <p className="text-purple-100">
                Descubre nuestros productos
              </p>
            </div>
            <a
              href="/admin/login"
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
            >
              Admin
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <SearchBar productos={productos} onFilter={handleFilter} />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4">Cargando productos...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg text-center mb-8">
            {error}
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <ProductGrid productos={filteredProductos} />
        )}

        {/* Results Count */}
        {!loading && !error && filteredProductos.length > 0 && (
          <div className="mt-8 text-center text-white">
            <p className="text-purple-100">
              Mostrando {filteredProductos.length} de {productos.length} productos
            </p>
          </div>
        )}
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton variant="floating" />
    </div>
  );
}
