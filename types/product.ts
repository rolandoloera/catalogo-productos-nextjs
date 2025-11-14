export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen_url: string | null;
  imagenes: string[];
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export interface ProductoFormData {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenes: string[];
}

export interface ProductoCreateResponse extends Producto {}

export interface ProductoUpdateResponse extends Producto {}

