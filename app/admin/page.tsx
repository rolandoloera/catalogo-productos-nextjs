"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Producto } from "@/types/product";
import Link from "next/link";

export default function AdminDashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    conStock: 0,
    sinStock: 0,
    totalValor: 0,
  });

  useEffect(() => {
    async function cargarDatos() {
      try {
        const data = await api.getProductos();
        setProductos(data);

        // Calcular estadísticas
        const total = data.length;
        const conStock = data.filter((p) => p.stock > 0).length;
        const sinStock = total - conStock;
        const totalValor = data.reduce(
          (sum, p) => sum + (typeof p.precio === "number" ? p.precio : parseFloat(String(p.precio))) * p.stock,
          0
        );

        setStats({ total, conStock, sinStock, totalValor });
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        <p className="mt-4 text-gray-600">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
        <Link
          href="/admin/productos/nuevo"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
        >
          + Nuevo Producto
        </Link>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-2">Total Productos</div>
          <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-2">Con Stock</div>
          <div className="text-3xl font-bold text-green-600">
            {stats.conStock}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-2">Sin Stock</div>
          <div className="text-3xl font-bold text-red-600">{stats.sinStock}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-600 text-sm mb-2">Valor Total</div>
          <div className="text-3xl font-bold text-purple-600">
            ${stats.totalValor.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Productos Recientes */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            Productos Recientes
          </h3>
        </div>
        <div className="p-6">
          {productos.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No hay productos.{" "}
              <Link
                href="/admin/productos/nuevo"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Crear el primero
              </Link>
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                      Producto
                    </th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                      Precio
                    </th>
                    <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                      Stock
                    </th>
                    <th className="text-right py-3 px-4 text-gray-700 font-semibold">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productos.slice(0, 10).map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800">
                          {producto.nombre}
                        </div>
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {producto.descripcion || "Sin descripción"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        ${typeof producto.precio === "number" ? producto.precio.toFixed(2) : parseFloat(String(producto.precio)).toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            producto.stock > 0
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {producto.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/admin/productos/${producto.id}`}
                          className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                        >
                          Editar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

