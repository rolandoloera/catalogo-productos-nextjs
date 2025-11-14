# 🎯 Guía Paso a Paso - Ejecutar el Proyecto

## ✅ Estado Actual

He preparado todo para ti. Aquí está lo que ya está listo:

- ✅ Archivo `.env.local` creado y configurado
- ✅ Base de datos PostgreSQL iniciada
- ✅ Backend API iniciado (puede tardar unos segundos en estar listo)

---

## 🚀 PASOS PARA EJECUTAR (En orden)

### **Paso 1: Verificar que el Backend esté listo**

Abre una terminal y ejecuta:

```bash
cd C:\Bitbucket\test_loera\catalogo-productos
docker-compose --profile local-db up -d
```

Espera 30 segundos y verifica:

```bash
docker ps
```

Deberías ver:
- `catalogo-productos-db` (healthy)
- `catalogo-productos-api` (puede estar "unhealthy" al inicio, es normal)

**Verificar que el API responda:**
```bash
curl http://localhost:3001/health
```

O abre en el navegador: http://localhost:3001/health

Deberías ver:
```json
{"status":"ok","database":"connected"}
```

---

### **Paso 2: Instalar dependencias de Next.js** (si no lo has hecho)

```bash
cd C:\Bitbucket\test_loera\catalogo-productos-nextjs
npm install
```

**Nota:** Si ya ejecutaste `npm install` antes, puedes saltar este paso.

---

### **Paso 3: Iniciar el servidor de desarrollo**

```bash
npm run dev
```

Deberías ver algo como:
```
▲ Next.js 16.0.3
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

---

### **Paso 4: Abrir en el navegador**

Abre tu navegador y visita:

**🌐 Catálogo Público:**
```
http://localhost:3000
```

**🔐 Panel de Administración:**
```
http://localhost:3000/admin/login
```

**Credenciales de login:**
- **Email:** `admin@catalogo.com`
- **Password:** `admin123`

---

## 🐛 Si algo no funciona

### Problema: "Cannot connect to API"

**Solución:**
1. Verifica que el backend esté corriendo:
   ```bash
   docker ps
   ```

2. Revisa los logs del API:
   ```bash
   cd C:\Bitbucket\test_loera\catalogo-productos
   docker-compose logs api
   ```

3. Reinicia el API:
   ```bash
   docker-compose restart api
   ```

### Problema: "Port 3000 already in use"

**Solución:**
```bash
# En Windows PowerShell
netstat -ano | findstr :3000
# Anota el PID y luego:
taskkill /PID <PID_NUMBER> /F
```

O cambia el puerto editando `package.json`:
```json
"dev": "next dev -p 3001"
```

### Problema: El API está "unhealthy"

**Solución:**
Es normal que al inicio esté "unhealthy". Espera 1-2 minutos y verifica:

```bash
curl http://localhost:3001/health
```

Si después de 2 minutos sigue sin responder, revisa los logs:
```bash
docker-compose logs api
```

---

## 📋 Comandos de Referencia Rápida

### Iniciar todo
```bash
# Terminal 1: Backend
cd C:\Bitbucket\test_loera\catalogo-productos
docker-compose --profile local-db up -d

# Terminal 2: Frontend
cd C:\Bitbucket\test_loera\catalogo-productos-nextjs
npm run dev
```

### Detener todo
```bash
# Detener backend
cd C:\Bitbucket\test_loera\catalogo-productos
docker-compose down

# Detener frontend
# Presiona Ctrl+C en la terminal donde corre npm run dev
```

### Ver logs
```bash
# Logs del backend
cd C:\Bitbucket\test_loera\catalogo-productos
docker-compose logs -f api

# Logs del frontend
# Se muestran automáticamente en la terminal donde corre npm run dev
```

---

## ✅ Verificación Final

Una vez que todo esté corriendo, deberías poder:

1. ✅ Ver el catálogo en http://localhost:3000
2. ✅ Hacer login en http://localhost:3000/admin/login
3. ✅ Ver el dashboard de administración
4. ✅ Crear/editar productos

---

## 🎓 Próximos Pasos

Una vez que todo funcione:

1. **Explora el código** - Revisa los componentes en `components/`
2. **Crea un producto** - Prueba el CRUD completo
3. **Personaliza** - Modifica colores en `app/globals.css`
4. **Experimenta** - Aprende React y Next.js modificando el código

---

## 📚 Archivos de Ayuda

- `GUIA-INICIO-RAPIDO.md` - Guía detallada completa
- `SETUP.md` - Configuración avanzada
- `README.md` - Documentación del proyecto

---

¡Listo para empezar! 🚀

