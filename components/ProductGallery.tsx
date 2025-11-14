"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  imagenes: string[];
  nombre: string;
}

export default function ProductGallery({
  imagenes,
  nombre,
}: ProductGalleryProps) {
  const [imagenPrincipal, setImagenPrincipal] = useState(
    imagenes[0] || null
  );

  if (imagenes.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl">
        📷 Sin imágenes
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-100">
        {imagenPrincipal && (
          <Image
            src={imagenPrincipal}
            alt={nombre}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>

      {/* Miniaturas */}
      {imagenes.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {imagenes.map((imagen, index) => (
            <button
              key={index}
              onClick={() => setImagenPrincipal(imagen)}
              className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                imagenPrincipal === imagen
                  ? "border-purple-500 ring-2 ring-purple-200"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <Image
                src={imagen}
                alt={`${nombre} - Imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 12vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

