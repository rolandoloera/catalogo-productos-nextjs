"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Producto } from "@/types/product";
import ProductForm from "@/components/admin/ProductForm";

export default function EditarProductoPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarProducto() {
      try {
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

  const handleSuccess = () => {
    router.push("/admin/productos");
  };

  const handleCancel = () => {
    router.push("/admin/productos");
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Producto no encontrado
        </h2>
        <p className="text-gray-600 mb-6">{error || "El producto no existe"}</p>
        <button
          onClick={() => router.push("/admin/productos")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Volver a productos
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Editar Producto
        </h2>
        <p className="text-gray-600 mt-2">
          Modifica la información del producto
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm
          producto={producto}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

