# 📱 PWA - Paso a Paso Rápido

## ✅ Estado Actual

Tu proyecto **YA ESTÁ CONFIGURADO** como PWA. Solo necesitas seguir estos pasos:

---

## 🎯 Paso 1: Verificar Iconos (✅ COMPLETADO)

Los iconos ya están generados en `/public`:
- ✅ `icon-192x192.png`
- ✅ `icon-512x512.png`
- ✅ `apple-touch-icon.png`
- ✅ `favicon-32x32.png`
- ✅ `favicon-16x16.png`

---

## 🚀 Paso 2: Construir y Probar

### 2.1. Construir el Proyecto

```bash
npm run build
```

**Importante:** PWA solo funciona en **producción**, no en desarrollo.

### 2.2. Iniciar en Modo Producción

```bash
npm start
```

O con Docker:
```bash
docker-compose up --build
```

### 2.3. Abrir en el Navegador

1. Abre: `http://localhost:3000`
2. Abre **DevTools** (F12)
3. Ve a **Application** → **Service Workers**
4. Debe mostrar: ✅ **activated and is running**

---

## 📱 Paso 3: Probar Instalación

### Android (Chrome)

1. Abre en tu móvil: `http://TU-IP:3000`
   - Encuentra tu IP: `ipconfig` (Windows)
   - Ejemplo: `http://192.168.1.100:3000`

2. En Chrome móvil:
   - Menú (3 puntos) → **"Instalar app"** o **"Agregar a pantalla de inicio"**
   - Confirma

3. ✅ La app aparecerá como ícono en tu pantalla

### iOS (Safari)

1. Abre en Safari: `http://TU-IP:3000`

2. Toca **Compartir** (cuadrado con flecha)

3. Selecciona **"Agregar a pantalla de inicio"**

4. Personaliza nombre → **"Agregar"**

5. ✅ La app aparecerá como ícono

---

## 🌐 Paso 4: Desplegar en Render

### 4.1. Subir Cambios

```bash
git add .
git commit -m "Agregar soporte PWA completo"
git push origin main
```

### 4.2. Render Desplegará Automáticamente

Espera 5-10 minutos y luego:

1. Abre tu URL: `https://tu-app.onrender.com`
2. Sigue los pasos del **Paso 3** para instalar

---

## ✅ Checklist Rápido

- [x] next-pwa instalado
- [x] next.config.ts configurado
- [x] manifest.json creado
- [x] Iconos generados
- [x] layout.tsx con metadata PWA
- [ ] Build de producción (`npm run build`)
- [ ] Probar localmente (`npm start`)
- [ ] Instalar en Android
- [ ] Instalar en iOS
- [ ] Desplegar en Render

---

## 🐛 Problemas Comunes

### "No aparece opción de instalar"

**Solución:**
- Debe estar en **HTTPS** (o localhost)
- Debe estar en **modo producción** (`npm start`, no `npm run dev`)
- Verifica que el Service Worker esté activo (DevTools → Application)

### "Service Worker no se registra"

**Solución:**
- Limpia caché: DevTools → Application → Clear storage
- Verifica que `next.config.ts` tenga `disable: false` en producción
- Revisa la consola por errores

### "Iconos no aparecen"

**Solución:**
- Verifica que los archivos existan en `/public`
- Verifica las rutas en `manifest.json`
- Recarga la página (Ctrl+Shift+R)

---

## 📊 Verificar con Lighthouse

1. Abre tu app
2. DevTools → **Lighthouse**
3. Selecciona **Progressive Web App**
4. **Generate report**
5. Debe mostrar: ✅ **Installable**

---

## 🎉 ¡Listo!

Tu app es ahora una **PWA instalable**. Los usuarios pueden:
- 📱 Instalarla en sus móviles
- 🚀 Abrirla como app nativa
- 📴 Usarla offline
- 🔄 Recibir actualizaciones automáticas

---

**Para más detalles:** Ver `PWA-GUIA-COMPLETA.md`

