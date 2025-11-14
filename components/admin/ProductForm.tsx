"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProductoFormData, Producto } from "@/types/product";
import { api } from "@/lib/api";
import { auth } from "@/lib/auth";

const productSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z.string(),
  precio: z.number().min(0.01, "El precio debe ser mayor a 0"),
  stock: z.number().min(0, "El stock no puede ser negativo"),
  imagenes: z.array(z.string()),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  producto?: Producto;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  producto,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [imagenesPreview, setImagenesPreview] = useState<string[]>(
    producto?.imagenes || producto?.imagen_url ? [producto.imagen_url || producto.imagenes[0] || ""] : []
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nombre: producto?.nombre || "",
      descripcion: producto?.descripcion || "",
      precio: producto
        ? typeof producto.precio === "number"
          ? producto.precio
          : parseFloat(String(producto.precio))
        : 0,
      stock: producto?.stock || 0,
      imagenes: producto?.imagenes || [],
    },
  });

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const token = auth.getToken();
    if (!token) {
      alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
      return;
    }

    setUploading(true);
    try {
      const fileArray = Array.from(files);
      if (fileArray.length === 1) {
        const url = await api.uploadImage(fileArray[0], token);
        const newImagenes = [...imagenesPreview, url];
        setImagenesPreview(newImagenes);
        setValue("imagenes", newImagenes);
      } else {
        const urls = await api.uploadMultipleImages(fileArray, token);
        const newImagenes = [...imagenesPreview, ...urls];
        setImagenesPreview(newImagenes);
        setValue("imagenes", newImagenes);
      }
    } catch (error: any) {
      alert(error.error || "Error al subir imágenes");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    const newImagenes = imagenesPreview.filter((_, i) => i !== index);
    setImagenesPreview(newImagenes);
    setValue("imagenes", newImagenes);
  };

  const onSubmit = async (data: ProductFormValues) => {
    const token = auth.getToken();
    if (!token) {
      alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
      return;
    }

    try {
      if (producto) {
        await api.updateProducto(producto.id, data, token);
      } else {
        await api.createProducto(data, token);
      }
      onSuccess();
    } catch (error: any) {
      alert(error.error || "Error al guardar producto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nombre */}
      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Nombre del Producto *
        </label>
        <input
          type="text"
          id="nombre"
          {...register("nombre")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label
          htmlFor="descripcion"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          {...register("descripcion")}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Precio y Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="precio"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Precio *
          </label>
          <input
            type="number"
            id="precio"
            step="0.01"
            min="0"
            {...register("precio", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
          {errors.precio && (
            <p className="mt-1 text-sm text-red-600">
              {errors.precio.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            min="0"
            {...register("stock", { valueAsNumber: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
          )}
        </div>
      </div>

      {/* Imágenes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imágenes del Producto
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleImageUpload(e.target.files)}
          disabled={uploading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
        {uploading && (
          <p className="mt-2 text-sm text-gray-600">Subiendo imágenes...</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Puedes subir múltiples imágenes (máximo 8)
        </p>

        {/* Preview de imágenes */}
        {imagenesPreview.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-4">
            {imagenesPreview.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors font-semibold"
        >
          {isSubmitting
            ? "Guardando..."
            : producto
            ? "Actualizar Producto"
            : "Crear Producto"}
        </button>
      </div>
    </form>
  );
}

