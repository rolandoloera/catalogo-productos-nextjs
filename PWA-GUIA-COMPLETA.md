# 📱 PWA - Guía Completa

Guía para convertir tu proyecto Next.js en una PWA (Progressive Web App) instalable en móviles.

---

## ✅ ¿Qué es una PWA?

Una **Progressive Web App** es una aplicación web que:
- ✅ Se puede **instalar** en el dispositivo móvil
- ✅ Funciona **offline** (con caché)
- ✅ Se ve como una app nativa
- ✅ Se actualiza automáticamente
- ✅ No requiere tiendas de aplicaciones

---

## 📋 Paso 1: Verificar Instalación

Ya hemos instalado `next-pwa`. Verifica:

```bash
cd test_loera/catalogo-productos-nextjs
npm list next-pwa
```

Si no está instalado:
```bash
npm install next-pwa@5.6.0 --save-dev
```

---

## 🎨 Paso 2: Crear Iconos PWA

Necesitas crear iconos en diferentes tamaños. Tienes 3 opciones:

### Opción A: Usar el Generador HTML (Más Fácil)

1. Abre `scripts/create-simple-icons.html` en tu navegador
2. Personaliza el texto y color
3. Haz clic en "Generar Icono"
4. Descarga todos los iconos
5. Colócalos en `/public`:
   - `icon-192x192.png`
   - `icon-512x512.png`
   - `apple-touch-icon.png`
   - `favicon-32x32.png`
   - `favicon-16x16.png`

### Opción B: Usar el Script Node.js

1. Instala `sharp`:
   ```bash
   npm install sharp --save-dev
   ```

2. Crea una imagen fuente de 512x512px llamada `icon-source.png` en `/public`

3. Ejecuta el script:
   ```bash
   node scripts/generate-icons.js
   ```

### Opción C: Crear Manualmente

Crea estos iconos con cualquier editor de imágenes:

- **icon-192x192.png** (192x192px)
- **icon-512x512.png** (512x512px)
- **apple-touch-icon.png** (180x180px)
- **favicon-32x32.png** (32x32px)
- **favicon-16x16.png** (16x16px)

**Recomendación:** Usa un fondo sólido (color morado #9333ea) con un emoji o logo centrado.

---

## 🔧 Paso 3: Verificar Configuración

### 3.1. Verificar `next.config.ts`

Ya está configurado con `next-pwa`. Debe verse así:

```typescript
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // ...
});
```

### 3.2. Verificar `app/layout.tsx`

Ya está configurado con metadata PWA. Debe incluir:
- `manifest: "/manifest.json"`
- `appleWebApp` config
- `icons` config
- `viewport` con `themeColor`

### 3.3. Verificar `public/manifest.json`

Ya está creado. Contiene:
- Nombre de la app
- Colores del tema
- Iconos
- Modo de visualización

---

## 🚀 Paso 4: Probar Localmente

### 4.1. Construir el Proyecto

```bash
npm run build
```

**Importante:** PWA solo funciona en producción, no en desarrollo.

### 4.2. Iniciar en Modo Producción

```bash
npm start
```

O con Docker:
```bash
docker-compose up --build
```

### 4.3. Probar en el Navegador

1. Abre `http://localhost:3000`
2. Abre las **DevTools** (F12)
3. Ve a la pestaña **Application** (o **Aplicación**)
4. Verifica:
   - ✅ **Manifest** está cargado
   - ✅ **Service Worker** está registrado
   - ✅ **Icons** están presentes

---

## 📱 Paso 5: Probar en Móvil

### Android (Chrome)

1. Abre la app en tu móvil: `http://TU-IP-LOCAL:3000`
   - Encuentra tu IP local: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
   - Ejemplo: `http://192.168.1.100:3000`

2. En Chrome móvil:
   - Toca el menú (3 puntos)
   - Selecciona **"Agregar a pantalla de inicio"** o **"Instalar app"**
   - Confirma la instalación

3. La app aparecerá como un ícono en tu pantalla de inicio

### iOS (Safari)

1. Abre la app en Safari: `http://TU-IP-LOCAL:3000`

2. Toca el botón **Compartir** (cuadrado con flecha)

3. Selecciona **"Agregar a pantalla de inicio"**

4. Personaliza el nombre y toca **"Agregar"**

5. La app aparecerá como un ícono en tu pantalla de inicio

---

## 🌐 Paso 6: Desplegar en Render

### 6.1. Verificar Variables de Entorno

Asegúrate de que en Render tengas:

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://tu-api.onrender.com
```

### 6.2. Desplegar

1. Haz push a GitHub:
   ```bash
   git add .
   git commit -m "Agregar soporte PWA"
   git push origin main
   ```

2. Render detectará los cambios y desplegará automáticamente

3. Espera a que termine el build (5-10 minutos)

### 6.3. Probar PWA en Producción

1. Abre tu URL de Render: `https://tu-app.onrender.com`

2. En Chrome móvil:
   - Toca el menú
   - Selecciona **"Instalar app"**
   - Confirma

3. En Safari iOS:
   - Toca **Compartir**
   - Selecciona **"Agregar a pantalla de inicio"**

---

## ✅ Checklist de Verificación

Antes de considerar la PWA completa, verifica:

- [ ] `next-pwa` instalado
- [ ] `next.config.ts` configurado con `withPWA`
- [ ] `manifest.json` en `/public`
- [ ] Iconos creados (192x192, 512x512, apple-touch-icon)
- [ ] `layout.tsx` con metadata PWA
- [ ] Build de producción funciona (`npm run build`)
- [ ] Service Worker se registra (verificar en DevTools)
- [ ] Manifest se carga correctamente
- [ ] Instalable en Android (Chrome)
- [ ] Instalable en iOS (Safari)
- [ ] Funciona offline (desconecta internet y prueba)

---

## 🐛 Solución de Problemas

### Problema: "No se puede instalar"

**Solución:**
- Verifica que estés en HTTPS (o localhost)
- Verifica que el manifest.json sea válido
- Verifica que los iconos existan
- Verifica que el Service Worker esté registrado

### Problema: "Service Worker no se registra"

**Solución:**
- Asegúrate de estar en modo producción (`npm start`, no `npm run dev`)
- Verifica que `next.config.ts` tenga `disable: false` en producción
- Limpia el caché del navegador
- Verifica la consola por errores

### Problema: "Iconos no aparecen"

**Solución:**
- Verifica que los archivos existan en `/public`
- Verifica que las rutas en `manifest.json` sean correctas
- Verifica que los tamaños sean exactos (192x192, 512x512, etc.)

### Problema: "No funciona offline"

**Solución:**
- Verifica que el Service Worker esté activo
- Verifica la configuración de `runtimeCaching` en `next.config.ts`
- Espera a que el Service Worker cachee los recursos

---

## 📊 Verificar PWA con Lighthouse

1. Abre tu app en Chrome
2. Abre DevTools (F12)
3. Ve a la pestaña **Lighthouse**
4. Selecciona **Progressive Web App**
5. Haz clic en **"Generate report"**
6. Debe mostrar:
   - ✅ Instalable
   - ✅ Service Worker registrado
   - ✅ Manifest válido
   - ✅ Iconos correctos

---

## 🎯 Características PWA Implementadas

✅ **Manifest.json** - Configuración de la app
✅ **Service Worker** - Caché offline
✅ **Iconos** - Múltiples tamaños
✅ **Metadata** - Configuración en layout
✅ **Theme Color** - Color del tema
✅ **Standalone Mode** - Se ve como app nativa
✅ **Offline Support** - Funciona sin internet (con caché)

---

## 📚 Recursos Adicionales

- [MDN: Progressive Web Apps](https://developer.mozilla.org/es/docs/Web/Progressive_web_apps)
- [Next.js PWA](https://github.com/shadowwalker/next-pwa)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)
- [PWA Checklist](https://web.dev/pwa-checklist/)

---

## 🎉 ¡Listo!

Tu app ahora es una PWA instalable. Los usuarios pueden:
- 📱 Instalarla en sus móviles
- 🚀 Abrirla como una app nativa
- 📴 Usarla offline (con caché)
- 🔄 Recibir actualizaciones automáticas

---

**¿Preguntas?** Revisa la sección de solución de problemas o consulta la documentación de `next-pwa`.

