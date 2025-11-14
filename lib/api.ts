import { Producto, ProductoFormData } from "@/types/product";
import { AuthResponse, LoginCredentials } from "@/types/auth";
import { ApiError } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const API_VERSION = process.env.API_VERSION || "v1";
const API_URL = `${API_BASE}/api/${API_VERSION}`;

// Helper para hacer requests con autenticación
async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  token?: string
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      error: `Error HTTP: ${response.status}`,
    }));
    throw error;
  }

  return response.json();
}

export const api = {
  // ========== PRODUCTOS PÚBLICOS ==========
  
  /**
   * Obtener todos los productos
   */
  async getProductos(): Promise<Producto[]> {
    try {
      const productos = await fetchWithAuth(`${API_URL}/productos`);
      return productos;
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      throw error;
    }
  },

  /**
   * Obtener un producto por ID
   */
  async getProducto(id: number): Promise<Producto> {
    try {
      const producto = await fetchWithAuth(`${API_URL}/productos/${id}`);
      return producto;
    } catch (error) {
      console.error(`Error obteniendo producto ${id}:`, error);
      throw error;
    }
  },

  // ========== AUTENTICACIÓN ==========

  /**
   * Login de administrador
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: `Error HTTP: ${response.status}`,
        }));
        throw errorData;
      }

      return await response.json();
    } catch (error: any) {
      console.error("Error en login:", error);
      // Si el error ya tiene la estructura correcta, lanzarlo tal cual
      if (error.error) {
        throw error;
      }
      // Si es un error de red u otro tipo, crear un objeto de error estándar
      throw {
        error: error.message || "Error al conectar con el servidor. Verifica que el backend esté corriendo.",
      };
    }
  },

  /**
   * Verificar token
   */
  async verifyToken(token: string): Promise<boolean> {
    try {
      await fetchWithAuth(`${API_URL}/auth/verify`, {}, token);
      return true;
    } catch (error) {
      return false;
    }
  },

  // ========== PRODUCTOS ADMIN (requieren autenticación) ==========

  /**
   * Crear un nuevo producto
   */
  async createProducto(
    data: ProductoFormData,
    token: string
  ): Promise<Producto> {
    try {
      const producto = await fetchWithAuth(
        `${API_URL}/productos`,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
        token
      );
      return producto;
    } catch (error) {
      console.error("Error creando producto:", error);
      throw error;
    }
  },

  /**
   * Actualizar un producto
   */
  async updateProducto(
    id: number,
    data: Partial<ProductoFormData>,
    token: string
  ): Promise<Producto> {
    try {
      const producto = await fetchWithAuth(
        `${API_URL}/productos/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        },
        token
      );
      return producto;
    } catch (error) {
      console.error(`Error actualizando producto ${id}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un producto
   */
  async deleteProducto(id: number, token: string): Promise<void> {
    try {
      await fetchWithAuth(
        `${API_URL}/productos/${id}`,
        {
          method: "DELETE",
        },
        token
      );
    } catch (error) {
      console.error(`Error eliminando producto ${id}:`, error);
      throw error;
    }
  },

  // ========== UPLOAD DE IMÁGENES ==========

  /**
   * Subir una imagen
   */
  async uploadImage(file: File, token: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("imagen", file);

      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir imagen");
      }

      const data = await response.json();
      return data.imagen_url;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    }
  },

  /**
   * Subir múltiples imágenes
   */
  async uploadMultipleImages(
    files: File[],
    token: string
  ): Promise<string[]> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("imagenes", file);
      });

      const response = await fetch(`${API_URL}/upload-multiple`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir imágenes");
      }

      const data = await response.json();
      return data.imagenes;
    } catch (error) {
      console.error("Error subiendo imágenes:", error);
      throw error;
    }
  },
};

