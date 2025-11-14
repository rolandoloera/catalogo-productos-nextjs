"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default function NuevoProductoPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/admin/productos");
  };

  const handleCancel = () => {
    router.push("/admin/productos");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Nuevo Producto</h2>
        <p className="text-gray-600 mt-2">
          Completa el formulario para agregar un nuevo producto
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <ProductForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  );
}

