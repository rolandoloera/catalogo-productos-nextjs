# Catálogo de Productos - Next.js

Catálogo de productos moderno construido con Next.js 14, React y TypeScript. Diseñado para vendedores locales que necesitan mostrar sus productos y coordinar ventas.

## 🚀 Características

- ✅ **Catálogo público atractivo** - Galería visual de productos
- ✅ **Panel de administración** - Gestión completa de productos (CRUD)
- ✅ **Autenticación segura** - Login protegido para administradores
- ✅ **Múltiples imágenes** - Soporte para hasta 8 imágenes por producto
- ✅ **Integración WhatsApp** - Botones de contacto directo
- ✅ **Búsqueda en tiempo real** - Filtrado instantáneo de productos
- ✅ **Diseño responsive** - Optimizado para móviles y desktop
- ✅ **TypeScript** - Tipado estático para mayor seguridad

## 📋 Prerrequisitos

- Node.js 18+ instalado
- Backend API funcionando (del proyecto `catalogo-productos`)
- PostgreSQL (o usar la BD de Render)

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.local.example .env.local
# Editar .env.local con tus configuraciones
```

3. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
catalogo-productos-nextjs/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal (catálogo)
│   ├── producto/[id]/    # Detalle de producto
│   └── admin/             # Panel de administración
│       ├── login/         # Login
│       ├── page.tsx       # Dashboard
│       └── productos/     # CRUD productos
├── components/            # Componentes React
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── SearchBar.tsx
│   ├── WhatsAppButton.tsx
│   └── admin/             # Componentes admin
├── lib/                   # Utilidades
│   ├── api.ts             # Cliente API
│   ├── auth.ts            # Autenticación
│   └── utils.ts           # Utilidades generales
└── types/                 # TypeScript types
```

## 🔗 Conexión con Backend

Este proyecto consume la API del proyecto `catalogo-productos` (backend existente).

**Asegúrate de que el backend esté corriendo:**
```bash
# En el proyecto anterior
cd ../catalogo-productos
docker-compose up api postgres
```

O si usas Render:
```bash
docker-compose -f docker-compose.render.yml up api
```

## 🔐 Autenticación

El panel de administración requiere autenticación. Las rutas `/admin/*` están protegidas.

**Nota:** Necesitarás implementar los endpoints de autenticación en el backend:
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/verify`

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Construir para producción
npm run start    # Iniciar en producción
npm run lint     # Linter
```

## 🎨 Tecnologías

- **Next.js 14** - Framework React con App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utility-first
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 📚 Próximos Pasos

1. Implementar endpoints de autenticación en el backend
2. Agregar más funcionalidades (categorías, búsqueda avanzada)
3. Mejorar diseño y UX
4. Agregar tests

## 🤝 Contribución

Este es un proyecto de aprendizaje. Siéntete libre de experimentar y mejorar.
