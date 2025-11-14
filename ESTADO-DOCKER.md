# 🐳 Estado de Contenedores Docker

## 📊 Resumen Actual

### ✅ Contenedores Activos

**Proyecto Anterior (`catalogo-productos`):**
- ✅ `catalogo-productos-api` - Puerto 3001 (Backend API)
- ✅ `catalogo-productos-db` - Puerto 5432 (PostgreSQL)

**Proyecto Nuevo (`catalogo-productos-nextjs`):**
- ℹ️ **No usa Docker** - Se ejecuta directamente con `npm run dev`
- ℹ️ Se conecta a la API del proyecto anterior

### ⏸️ Contenedores Detenidos

- ⏸️ `catalogo-productos-frontend` - Frontend antiguo (ya no se usa)

---

## 🔍 Detalles

### Proyecto Anterior (catalogo-productos)

**Contenedores:**
1. **catalogo-productos-api**
   - Puerto: `3001`
   - Estado: Corriendo (puede mostrar "unhealthy" al inicio, es normal)
   - Función: Backend API REST
   - Endpoints: `/api/v1/productos`, `/api/v1/auth/login`, etc.

2. **catalogo-productos-db**
   - Puerto: `5432`
   - Estado: Healthy ✅
   - Función: Base de datos PostgreSQL
   - Datos: Productos, usuarios, imágenes

3. **catalogo-productos-frontend** (Detenido)
   - Ya no se usa (reemplazado por Next.js)

### Proyecto Nuevo (catalogo-productos-nextjs)

**No usa Docker porque:**
- Next.js se ejecuta directamente con Node.js
- Solo necesita conectarse a la API (que ya está en Docker)
- Desarrollo más rápido sin contenedores

**Cómo se ejecuta:**
```bash
npm run dev
# Se ejecuta en http://localhost:3000
```

---

## 🔄 Cómo Gestionar los Contenedores

### Ver todos los contenedores
```bash
docker ps -a
```

### Ver solo los activos
```bash
docker ps
```

### Iniciar contenedores del proyecto anterior
```bash
cd C:\Bitbucket\test_loera\catalogo-productos
docker-compose --profile local-db up -d
```

### Detener contenedores
```bash
cd C:\Bitbucket\test_loera\catalogo-productos
docker-compose down
```

### Ver logs del API
```bash
docker-compose logs -f api
```

### Reiniciar el API
```bash
docker-compose restart api
```

---

## ⚠️ Notas Importantes

1. **El proyecto Next.js NO necesita Docker** para desarrollo local
2. **Comparte la misma API** del proyecto anterior
3. **Comparte la misma base de datos** del proyecto anterior
4. El frontend antiguo (`catalogo-productos-frontend`) ya no se usa

---

## 🚀 Para Desarrollo

**Terminal 1 - Backend (Docker):**
```bash
cd C:\Bitbucket\test_loera\catalogo-productos
docker-compose --profile local-db up -d
```

**Terminal 2 - Frontend (Next.js):**
```bash
cd C:\Bitbucket\test_loera\catalogo-productos-nextjs
npm run dev
```

**Resultado:**
- API: http://localhost:3001
- Frontend: http://localhost:3000
- Base de datos: localhost:5432

---

## 📝 Para Producción (Render)

En producción:
- **Backend API**: Se despliega en Render como Web Service
- **Frontend Next.js**: Se despliega en Render como Web Service
- **Base de datos**: PostgreSQL en Render (o externa)

No necesitas Docker en producción, Render maneja todo.

