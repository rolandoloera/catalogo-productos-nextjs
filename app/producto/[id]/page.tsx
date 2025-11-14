"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "@/lib/api";
import { Producto } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import ProductGallery from "@/components/ProductGallery";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ProductoPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarProducto() {
      try {
        setLoading(true);
        const data = await api.getProducto(id);
        setProducto(data);
      } catch (err: any) {
        setError(err.error || "Producto no encontrado");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      cargarProducto();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Producto no encontrado
          </h2>
          <p className="text-gray-600 mb-6">{error || "El producto que buscas no existe"}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    );
  }

  const precio =
    typeof producto.precio === "number"
      ? producto.precio
      : parseFloat(String(producto.precio));

  const imagenes = producto.imagenes && producto.imagenes.length > 0
    ? producto.imagenes
    : producto.imagen_url
    ? [producto.imagen_url]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.push("/")}
            className="text-white hover:text-purple-100 flex items-center gap-2"
          >
            ← Volver al catálogo
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Galería de Imágenes */}
            <div>
              <ProductGallery imagenes={imagenes} nombre={producto.nombre} />
            </div>

            {/* Información del Producto */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {producto.nombre}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-green-600">
                    {formatPrice(precio)}
                  </span>
                  {producto.stock > 0 ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      En stock ({producto.stock} disponibles)
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Agotado
                    </span>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Descripción
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {producto.descripcion || "Sin descripción disponible"}
                </p>
              </div>

              {/* Botones de Acción */}
              <div className="space-y-3 pt-4">
                <WhatsAppButton
                  producto={producto}
                  className="w-full justify-center py-3 text-lg"
                />
                <button
                  onClick={() => router.push("/")}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Ver más productos
                </button>
              </div>

              {/* Información adicional */}
              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">ID:</span> {producto.id}
                  </div>
                  <div>
                    <span className="font-semibold">Stock:</span> {producto.stock} unidades
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton variant="floating" />
    </div>
  );
}

