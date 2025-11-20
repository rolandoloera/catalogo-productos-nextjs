# 🚀 Guía de Despliegue en Render

Esta guía te ayudará a desplegar el proyecto Next.js en Render paso a paso.

---

## 📋 Prerrequisitos

- ✅ Código subido a GitHub
- ✅ Cuenta en Render (https://render.com)
- ✅ Backend API desplegado (o URL del API)

---

## 🔄 Paso 1: Subir Cambios a GitHub

### 1.1. Verificar estado

```bash
cd C:\Bitbucket\test_loera\catalogo-productos-nextjs
git status
```

### 1.2. Agregar cambios

```bash
git add .
```

### 1.3. Hacer commit

```bash
git commit -m "Agregar configuración Docker para Cloud Run y mejoras"
```

### 1.4. Subir a GitHub

```bash
# Si es la primera vez
git remote add origin https://github.com/TU_USUARIO/catalogo-productos-nextjs.git
git branch -M main
git push -u origin main

# Si ya existe el remote
git push origin main
```

---

## 🌐 Paso 2: Crear Servicio en Render

### 2.1. Acceder a Render

1. Ve a https://render.com
2. Inicia sesión (o regístrate con GitHub)

### 2.2. Crear Nuevo Web Service

1. Haz clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio `catalogo-productos-nextjs`

### 2.3. Configurar el Servicio

**Información Básica:**
- **Name:** `catalogo-productos-nextjs` (o el que prefieras)
- **Region:** Elige la más cercana (US East, US West, etc.)
- **Branch:** `main`
- **Root Directory:** (dejar vacío)

**Build & Deploy:**
- **Runtime:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Environment Variables:**

Agrega estas variables:

```env
# Backend API (URL de tu API desplegada)
NEXT_PUBLIC_API_URL=https://tu-api-en-render.onrender.com
API_URL=https://tu-api-en-render.onrender.com
API_VERSION=v1

# Node Environment
NODE_ENV=production

# WhatsApp (opcional)
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890
```

**Importante:**
- Reemplaza `https://tu-api-en-render.onrender.com` con la URL real de tu API
- Si tu API también está en Render, usa la URL que Render te proporciona

### 2.4. Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir y desplegar
3. Esto puede tomar 5-10 minutos la primera vez

---

## 🔧 Paso 3: Configurar Backend API (Si no está desplegado)

Si tu backend API no está en Render, necesitas desplegarlo también:

### 3.1. Desplegar API en Render

1. Crea otro **Web Service**
2. Selecciona el repositorio `catalogo-productos`
3. Configuración:
   - **Root Directory:** `services/api`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     ```env
     PORT=3001
     API_VERSION=v1
     DATABASE_URL=postgresql://... (tu base de datos)
     JWT_SECRET=tu-secret-super-seguro
     ADMIN_EMAIL=admin@catalogo.com
     ADMIN_PASSWORD=tu-password-seguro
     ```

### 3.2. Obtener URL del API

Una vez desplegado, Render te dará una URL como:
```
https://catalogo-api.onrender.com
```

### 3.3. Actualizar Frontend

1. Ve a tu servicio de Next.js en Render
2. Ve a **"Environment"**
3. Actualiza `NEXT_PUBLIC_API_URL` con la URL del API
4. Haz clic en **"Save Changes"**
5. Render desplegará automáticamente

---

## 📝 Paso 4: Variables de Entorno Importantes

### Frontend (Next.js)

```env
NEXT_PUBLIC_API_URL=https://tu-api.onrender.com
API_VERSION=v1
NODE_ENV=production
NEXT_PUBLIC_WHATSAPP_NUMBER=521234567890
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
# 1. Hacer cambios
# 2. Commit
git add .
git commit -m "Descripción de los cambios"

# 3. Push a GitHub
git push origin main

# 4. Render detectará automáticamente y desplegará
```

Render tiene **auto-deploy** activado por defecto para la rama `main`.

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Solución:**
- Revisa los logs de build en Render
- Verifica que `npm run build` funcione localmente
- Asegúrate de que todas las dependencias estén en `package.json`

### Error: "Cannot connect to API"

**Solución:**
- Verifica que `NEXT_PUBLIC_API_URL` esté correctamente configurado
- Asegúrate de que el API esté desplegado y funcionando
- Verifica que la URL del API sea accesible públicamente

### Error: "Environment variable not found"

**Solución:**
- Verifica que todas las variables estén configuradas en Render
- Las variables que empiezan con `NEXT_PUBLIC_` son públicas

### El sitio está lento

**Solución:**
- Render plan gratuito "duerme" después de inactividad
- La primera carga puede tardar 30-60 segundos
- Considera el plan de pago para mejor rendimiento

---

## 📊 Monitoreo

### Ver Logs

1. Ve a tu servicio en Render
2. Haz clic en **"Logs"**
3. Verás logs en tiempo real

### Ver Métricas

1. Ve a tu servicio
2. Haz clic en **"Metrics"**
3. Verás CPU, memoria, requests, etc.

---

## 🔐 Seguridad

### Variables Sensibles

- ✅ **NUNCA** subas `.env.local` a GitHub
- ✅ Usa variables de entorno en Render
- ✅ Genera `JWT_SECRET` aleatorio y seguro
- ✅ Cambia credenciales por defecto

### Generar JWT_SECRET

```bash
# En Linux/Mac
openssl rand -base64 32

# En Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

---

## ✅ Checklist de Despliegue

- [ ] Código subido a GitHub
- [ ] Servicio creado en Render
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] Frontend accesible
- [ ] API conectado correctamente
- [ ] Login funcionando
- [ ] Productos cargando

---

## 🎯 URLs Finales

Después del despliegue tendrás:

- **Frontend:** `https://catalogo-productos-nextjs.onrender.com`
- **API:** `https://catalogo-api.onrender.com` (si también está en Render)

---

## 📚 Recursos

- [Documentación de Render](https://render.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://render.com/docs/environment-variables)

---

¡Listo para desplegar! 🚀


