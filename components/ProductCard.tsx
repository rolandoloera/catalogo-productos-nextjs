import Image from "next/image";
import Link from "next/link";
import { Producto } from "@/types/product";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  producto: Producto;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const imagenPrincipal =
    producto.imagenes?.[0] || producto.imagen_url || null;
  const precio =
    typeof producto.precio === "number"
      ? producto.precio
      : parseFloat(String(producto.precio));

  return (
    <Link href={`/producto/${producto.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
        <div className="relative h-64 w-full bg-gradient-to-br from-purple-400 to-purple-600">
          {imagenPrincipal ? (
            <Image
              src={imagenPrincipal}
              alt={producto.nombre}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white text-2xl">
              📷 Sin imagen
            </div>
          )}
          {producto.imagenes && producto.imagenes.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {producto.imagenes.length} imágenes
            </div>
          )}
          {producto.stock === 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Agotado
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">
            {producto.nombre}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
            {producto.descripcion || "Sin descripción"}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(precio)}
            </span>
            {producto.stock > 0 ? (
              <span className="text-sm text-gray-500">
                Stock: {producto.stock}
              </span>
            ) : (
              <span className="text-sm text-red-500 font-semibold">
                Sin stock
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

