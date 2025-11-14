"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";
import { Producto } from "@/types/product";

export default function ProductosAdminPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await api.getProductos();
        setProductos(data);
      } catch (err: any) {
        setError(err.error || "Error al cargar productos");
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) {
      return;
    }

    const token = auth.getToken();
    if (!token) {
      alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
      return;
    }

    try {
      await api.deleteProducto(id, token);
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.error || "Error al eliminar producto");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Gestión de Productos</h2>
        <Link
          href="/admin/productos/nuevo"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          + Nuevo Producto
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {productos.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg mb-4">
            No hay productos registrados
          </p>
          <Link
            href="/admin/productos/nuevo"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            Crear primer producto
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Imagen
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Nombre
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Precio
                  </th>
                  <th className="text-left py-4 px-6 text-gray-700 font-semibold">
                    Stock
                  </th>
                  <th className="text-right py-4 px-6 text-gray-700 font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => {
                  const imagen =
                    producto.imagenes?.[0] ||
                    producto.imagen_url ||
                    null;
                  const precio =
                    typeof producto.precio === "number"
                      ? producto.precio
                      : parseFloat(String(producto.precio));

                  return (
                    <tr
                      key={producto.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-6">
                        {imagen ? (
                          <img
                            src={imagen}
                            alt={producto.nombre}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                            📷
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">
                          {producto.nombre}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {producto.descripcion || "Sin descripción"}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-800 font-semibold">
                        ${precio.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            producto.stock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {producto.stock}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/productos/${producto.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors text-sm"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(producto.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

