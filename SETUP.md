# 🚀 Guía de Setup - Proyecto Next.js

Esta guía te ayudará a configurar y ejecutar el nuevo proyecto Next.js.

## 📋 Prerrequisitos

- Node.js 18+ instalado
- npm o yarn
- Backend API funcionando (del proyecto `catalogo-productos`)

## 🔧 Configuración Inicial

### 1. Instalar dependencias

```bash
cd catalogo-productos-nextjs
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y edítalo:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` con tus configuraciones:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
API_URL=http://localhost:3001
API_VERSION=v1

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890
```

### 3. Iniciar el backend (del proyecto anterior)

En otra terminal:

```bash
cd ../catalogo-productos
docker-compose up api postgres
```

O si usas Render:

```bash
docker-compose -f docker-compose.render.yml up api
```

### 4. Iniciar Next.js

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## 🔐 Credenciales por Defecto

Al iniciar el backend por primera vez, se crea un usuario administrador:

- **Email:** `admin@catalogo.com` (o el valor de `ADMIN_EMAIL`)
- **Password:** `admin123` (o el valor de `ADMIN_PASSWORD`)

**⚠️ IMPORTANTE:** Cambia estas credenciales en producción.

## 📁 Estructura del Proyecto

```
catalogo-productos-nextjs/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Página principal (catálogo público)
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

## 🎯 Funcionalidades

### Públicas (sin login)
- ✅ Ver catálogo de productos
- ✅ Buscar productos
- ✅ Ver detalle de producto
- ✅ Contactar por WhatsApp

### Administración (requiere login)
- ✅ Login seguro
- ✅ Dashboard con estadísticas
- ✅ Crear productos
- ✅ Editar productos
- ✅ Eliminar productos
- ✅ Subir imágenes (múltiples)

## 🐛 Troubleshooting

### Error: "Cannot connect to API"
- Verifica que el backend esté corriendo en `http://localhost:3001`
- Revisa las variables de entorno en `.env.local`

### Error: "401 Unauthorized"
- Verifica que estés logueado
- El token puede haber expirado, vuelve a iniciar sesión

### Error: "Producto no encontrado"
- Verifica que el ID del producto sea correcto
- Asegúrate de que el backend tenga productos

## 📚 Próximos Pasos

1. Personalizar diseño y colores
2. Agregar más funcionalidades
3. Mejorar SEO
4. Agregar tests

## 🤝 Desarrollo

```bash
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm run start

# Linter
npm run lint
```

