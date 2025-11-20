# 🛍️ Catálogo de Productos - Next.js

Catálogo de productos con Next.js, React, TypeScript y PWA.

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
npm install
npm run dev
```

### Producción Local (con Docker)

```bash
docker-compose up --build
```

### Desplegar en Render

1. **Obtener DATABASE_URL** de Render (Dashboard → BD → Connections → Internal Database URL)
2. **Desplegar API** desde `catalogo-productos` (rootDir: `services/api`)
3. **Desplegar Frontend** desde este proyecto (rootDir: vacío)

Ver `render.yaml` para configuración automática.

## 📋 Variables de Entorno

### API (en catalogo-productos)
```env
DATABASE_URL=postgresql://usuario:password@host:5432/database?sslmode=require
JWT_SECRET=(genera uno aleatorio)
ADMIN_PASSWORD=tu-password-seguro
```

### Frontend
```env
NEXT_PUBLIC_API_URL=https://tu-api.onrender.com
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890
```

## 📱 PWA

El proyecto está configurado como PWA instalable. Ver `PWA-GUIA-COMPLETA.md` para más detalles.

## 🔑 Credenciales por Defecto

- Email: `admin@catalogo.com`
- Password: `admin123` (cambiar en producción)

## 📚 Documentación

- `PWA-GUIA-COMPLETA.md` - Guía completa de PWA
- `render.yaml` - Configuración para Render
