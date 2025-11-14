# 🚀 Guía de Inicio Rápido - Paso a Paso

Esta guía te llevará paso a paso para ejecutar el proyecto Next.js desde cero.

## 📋 Paso 1: Verificar Prerrequisitos

Asegúrate de tener instalado:
- ✅ Node.js 18 o superior
- ✅ Docker y Docker Compose (para el backend)
- ✅ Git (opcional)

**Verificar Node.js:**
```bash
node --version
# Debe mostrar v18.x.x o superior

npm --version
# Debe mostrar 9.x.x o superior
```

---

## 📂 Paso 2: Navegar al Proyecto

Abre una terminal y navega al proyecto:

```bash
cd C:\Bitbucket\test_loera\catalogo-productos-nextjs
```

---

## ⚙️ Paso 3: Configurar Variables de Entorno

### 3.1. Crear archivo .env.local

```bash
# En Windows (PowerShell)
Copy-Item .env.local.example .env.local

# O en Git Bash
cp .env.local.example .env.local
```

### 3.2. Editar .env.local

Abre el archivo `.env.local` con tu editor favorito y verifica que tenga:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3001
API_URL=http://localhost:3001
API_VERSION=v1

# WhatsApp (opcional - reemplaza con tu número)
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890
```

**Nota:** El número de WhatsApp debe incluir el código de país sin el signo `+`. Ejemplo: `521234567890` para México.

---

## 🗄️ Paso 4: Iniciar el Backend (Base de Datos y API)

### Opción A: Usando Docker Compose (Recomendado)

Abre una **nueva terminal** y ejecuta:

```bash
# Navegar al proyecto del backend
cd C:\Bitbucket\test_loera\catalogo-productos

# Iniciar servicios (base de datos + API)
docker-compose up -d
```

**Verificar que esté corriendo:**
```bash
# Ver los contenedores activos
docker ps

# Ver los logs del API
docker-compose logs api
```

Deberías ver algo como:
```
🚀 API Service corriendo en http://localhost:3001
✅ Conexión a PostgreSQL exitosa
✅ Tabla productos creada/verificada
✅ Usuario administrador creado
```

### Opción B: Usando Render (Base de datos en la nube)

Si prefieres usar la base de datos de Render:

1. Edita el archivo `.env` en `catalogo-productos`:
   ```env
   DATABASE_URL=postgresql://usuario:password@host:puerto/database
   ```

2. Inicia solo el API:
   ```bash
   cd C:\Bitbucket\test_loera\catalogo-productos
   docker-compose -f docker-compose.render.yml up -d
   ```

---

## 📦 Paso 5: Instalar Dependencias de Next.js

En la terminal del proyecto Next.js:

```bash
cd C:\Bitbucket\test_loera\catalogo-productos-nextjs

# Instalar todas las dependencias
npm install
```

Esto puede tomar 1-2 minutos. Deberías ver:
```
added 390 packages, and audited 390 packages
```

---

## 🚀 Paso 6: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Deberías ver:
```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
- ready started server on 0.0.0.0:3000
```

---

## 🌐 Paso 7: Abrir en el Navegador

Abre tu navegador y visita:

**Catálogo Público:**
```
http://localhost:3000
```

**Panel de Administración:**
```
http://localhost:3000/admin/login
```

---

## 🔐 Paso 8: Iniciar Sesión como Administrador

En la página de login (`/admin/login`), usa estas credenciales:

- **Email:** `admin@catalogo.com`
- **Password:** `admin123`

**⚠️ IMPORTANTE:** Estas son credenciales por defecto. Cámbialas en producción.

---

## ✅ Verificación: ¿Todo Funciona?

### ✅ Verificar Backend

Abre en el navegador:
```
http://localhost:3001/health
```

Deberías ver:
```json
{
  "status": "ok",
  "service": "catalogo-productos-api",
  "database": "connected"
}
```

### ✅ Verificar API de Productos

```
http://localhost:3001/api/v1/productos
```

Deberías ver una lista de productos (puede estar vacía si no hay productos).

### ✅ Verificar Frontend

- El catálogo carga sin errores
- Puedes hacer login
- El dashboard muestra estadísticas
- Puedes crear/editar productos

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot connect to API"

**Solución:**
1. Verifica que el backend esté corriendo:
   ```bash
   docker ps
   ```
2. Verifica que el puerto 3001 esté libre
3. Revisa los logs:
   ```bash
   docker-compose logs api
   ```

### Error: "ECONNREFUSED"

**Solución:**
- Asegúrate de que `NEXT_PUBLIC_API_URL` en `.env.local` sea `http://localhost:3001`
- Reinicia el servidor Next.js después de cambiar `.env.local`

### Error: "401 Unauthorized" al hacer login

**Solución:**
1. Verifica que el backend tenga la tabla `usuarios` creada
2. Revisa los logs del backend para ver si se creó el usuario admin
3. Intenta reiniciar el backend:
   ```bash
   docker-compose restart api
   ```

### Error: "Port 3000 already in use"

**Solución:**
```bash
# En Windows, encontrar y matar el proceso
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# O cambiar el puerto en package.json
# Agregar: "dev": "next dev -p 3001"
```

### Error: "Module not found"

**Solución:**
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Comandos Útiles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en modo producción
npm run start

# Ejecutar linter
npm run lint
```

### Docker (Backend)

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Detener servicios
docker-compose down

# Reiniciar servicios
docker-compose restart
```

---

## 🎯 Próximos Pasos

Una vez que todo esté funcionando:

1. **Explorar el catálogo público** - Navega por los productos
2. **Crear un producto** - Ve a Admin → Productos → Nuevo
3. **Subir imágenes** - Prueba subir múltiples imágenes
4. **Personalizar diseño** - Modifica colores en `globals.css`
5. **Agregar más funcionalidades** - Experimenta con React y Next.js

---

## 📚 Recursos de Aprendizaje

- [Documentación Next.js](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 💡 Tips

- **Hot Reload:** Los cambios en el código se reflejan automáticamente
- **DevTools:** Abre las herramientas de desarrollador (F12) para ver errores
- **Logs:** Revisa la terminal para ver errores del servidor
- **Variables de entorno:** Reinicia el servidor después de cambiar `.env.local`

---

¡Disfruta aprendiendo Next.js y React! 🚀

