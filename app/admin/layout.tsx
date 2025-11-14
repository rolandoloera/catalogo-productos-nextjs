"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Si está en la página de login, no verificar autenticación
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    // Verificar autenticación
    if (!auth.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    setIsLoading(false);
  }, [pathname, router]);

  // Si está en login, mostrar sin layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  const user = auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Panel de Administración
              </h1>
              {user && (
                <p className="text-sm text-gray-600">
                  Bienvenido, {user.nombre || user.email}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-gray-600 hover:text-gray-800"
                target="_blank"
              >
                Ver catálogo
              </a>
              <button
                onClick={() => {
                  auth.logout();
                  router.push("/admin/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            <a
              href="/admin"
              className={`py-4 px-2 border-b-2 ${
                pathname === "/admin"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Dashboard
            </a>
            <a
              href="/admin/productos"
              className={`py-4 px-2 border-b-2 ${
                pathname?.startsWith("/admin/productos")
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              Productos
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

