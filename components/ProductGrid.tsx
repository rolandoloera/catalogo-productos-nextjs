import { Producto } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  productos: Producto[];
}

export default function ProductGrid({ productos }: ProductGridProps) {
  if (productos.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-xl text-white">No hay productos disponibles</p>
        <p className="text-purple-100 mt-2">
          Los productos aparecerán aquí cuando estén disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

