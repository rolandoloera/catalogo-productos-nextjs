# 🚀 Guía: Subir a GitHub y Desplegar en Render

Esta guía te llevará paso a paso para subir el proyecto a GitHub y desplegarlo en Render.

---

## 📋 Parte 1: Preparar el Proyecto para Git

### Paso 1: Verificar .gitignore

Asegúrate de que `.gitignore` incluya:
- `node_modules/`
- `.env.local`
- `.next/`
- Archivos sensibles

### Paso 2: Crear archivo README (si no existe)

El proyecto ya tiene `README.md`, pero puedes mejorarlo.

---

## 📦 Parte 2: Subir a GitHub

### Opción A: Proyecto Nuevo (Recomendado)

#### 1. Inicializar Git (si no está inicializado)

```bash
cd C:\Bitbucket\test_loera\catalogo-productos-nextjs
git init
```

#### 2. Agregar archivos

```bash
git add .
```

#### 3. Hacer commit inicial

```bash
git commit -m "Initial commit: Proyecto Next.js catálogo de productos"
```

#### 4. Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `catalogo-productos-nextjs` (o el que prefieras)
3. **NO** marques "Initialize with README" (ya tenemos archivos)
4. Haz clic en "Create repository"

#### 5. Conectar y subir

```bash
# Reemplaza USERNAME con tu usuario de GitHub
git remote add origin https://github.com/USERNAME/catalogo-productos-nextjs.git
git branch -M main
git push -u origin main
```

### Opción B: Agregar a Repositorio Existente

Si ya tienes un repositorio:

```bash
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

---

## 🌐 Parte 3: Desplegar en Render

### Paso 1: Crear cuenta en Render

1. Ve a https://render.com
2. Regístrate con GitHub (recomendado)
3. Conecta tu cuenta de GitHub

### Paso 2: Crear nuevo servicio Web Service

1. En el dashboard de Render, haz clic en "New +"
2. Selecciona "Web Service"
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `catalogo-productos-nextjs`

### Paso 3: Configurar el servicio

**Configuración básica:**
- **Name:** `catalogo-productos-nextjs` (o el que prefieras)
- **Region:** Elige la más cercana (US East, US West, etc.)
- **Branch:** `main`
- **Root Directory:** (dejar vacío, o `./` si está en subdirectorio)
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Variables de entorno:**

Agrega estas variables en "Environment Variables":

```env
# Backend API (URL de tu API desplegada en Render)
NEXT_PUBLIC_API_URL=https://tu-api-en-render.onrender.com
API_URL=https://tu-api-en-render.onrender.com
API_VERSION=v1

# WhatsApp (opcional)
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890

# Node Environment
NODE_ENV=production
```

**Importante:** 
- Reemplaza `https://tu-api-en-render.onrender.com` con la URL real de tu API backend
- Si tu API también está en Render, usa la URL que Render te proporciona

### Paso 4: Desplegar

1. Haz clic en "Create Web Service"
2. Render comenzará a construir y desplegar tu aplicación
3. Esto puede tomar 5-10 minutos la primera vez

### Paso 5: Verificar despliegue

1. Una vez completado, Render te dará una URL como:
   `https://catalogo-productos-nextjs.onrender.com`
2. Abre la URL en tu navegador
3. Verifica que todo funcione correctamente

---

## 🔧 Parte 4: Configurar Backend en Render (Si aún no está)

Si tu backend no está desplegado en Render:

### Opción A: Desplegar Backend también en Render

1. Crea un nuevo Web Service
2. Selecciona el repositorio del backend (`catalogo-productos`)
3. Configuración:
   - **Build Command:** `cd services/api && npm install`
   - **Start Command:** `cd services/api && npm start`
   - **Environment Variables:**
     ```env
     PORT=3001
     API_VERSION=v1
     DATABASE_URL=postgresql://... (tu base de datos)
     JWT_SECRET=tu-secret-super-seguro
     ```

### Opción B: Usar Backend Local (No recomendado para producción)

Solo para desarrollo. En producción, ambos deben estar en la nube.

---

## 📝 Variables de Entorno Importantes

### Frontend (Next.js)
```env
NEXT_PUBLIC_API_URL=https://tu-api.onrender.com
API_VERSION=v1
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890
NODE_ENV=production
```

### Backend (API)
```env
PORT=3001
API_VERSION=v1
DATABASE_URL=postgresql://usuario:password@host:puerto/database
JWT_SECRET=tu-secret-super-seguro-genera-uno-aleatorio
ADMIN_EMAIL=admin@catalogo.com
ADMIN_PASSWORD=tu-password-seguro
```

---

## 🔄 Actualizar Código

Cada vez que hagas cambios:

```bash
# 1. Hacer cambios en tu código
# 2. Commit
git add .
git commit -m "Descripción de los cambios"

# 3. Push a GitHub
git push origin main

# 4. Render detectará automáticamente los cambios y desplegará
```

Render tiene **auto-deploy** activado por defecto, así que cada push a `main` desplegará automáticamente.

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Solución:**
- Revisa los logs de build en Render
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que `npm run build` funcione localmente

### Error: "Cannot connect to API"

**Solución:**
- Verifica que `NEXT_PUBLIC_API_URL` esté correctamente configurado
- Asegúrate de que el backend esté desplegado y funcionando
- Verifica que la URL del API sea accesible públicamente

### Error: "Environment variable not found"

**Solución:**
- Verifica que todas las variables de entorno estén configuradas en Render
- Las variables que empiezan con `NEXT_PUBLIC_` son públicas y se incluyen en el build

### El sitio está lento

**Solución:**
- Render tiene un plan gratuito que "duerme" después de inactividad
- La primera carga puede tardar 30-60 segundos
- Considera el plan de pago para mejor rendimiento

---

## 💡 Tips

1. **Usa nombres descriptivos** para tus servicios en Render
2. **Guarda las URLs** de tus servicios desplegados
3. **Revisa los logs** si algo no funciona
4. **Prueba localmente primero** antes de hacer push
5. **Usa variables de entorno** para configuración sensible

---

## 📚 Recursos

- [Documentación de Render](https://render.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Guides](https://guides.github.com/)

---

¡Listo para desplegar! 🚀

