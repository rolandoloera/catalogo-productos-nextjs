# 🔧 Solución de Errores Docker

## ✅ Errores Resueltos

### 1. Error: Node.js version
**Problema:** `Node.js version ">=20.9.0" is required`

**Solución:** Actualizado Dockerfile de `node:18-alpine` a `node:20-alpine`

### 2. Error: Puerto 5432 ya en uso
**Problema:** `Bind for 0.0.0.0:5432 failed: port is already allocated`

**Solución:** Cambiado puerto externo a `5433:5432` en docker-compose.yml

### 3. Error: Puerto 3001 ya en uso
**Problema:** `Bind for 0.0.0.0:3001 failed: port is already allocated`

**Solución:** Cambiado puerto externo del API a `3002:3001` en docker-compose.yml

---

## 🐳 Opciones de Configuración

### Opción 1: Servicios Independientes (Actual)

Usa `docker-compose.yml` - Crea sus propios servicios:
- Frontend: puerto 3000
- API: puerto 3002 (externo)
- DB: puerto 5433 (externo)

```bash
docker-compose up -d
```

### Opción 2: Reutilizar Servicios Existentes

Si ya tienes `catalogo-productos-api` y `catalogo-productos-db` corriendo:

```bash
docker-compose -f docker-compose.reusar-servicios.yml up -d
```

Esto solo crea el frontend y se conecta a los servicios existentes.

---

## 📊 Estado Actual

```bash
# Ver contenedores del proyecto nuevo
docker ps --filter "name=catalogo-nextjs"

# Ver todos los contenedores
docker ps
```

**Contenedores esperados:**
- ✅ `catalogo-nextjs-frontend` - Puerto 3000
- ✅ `catalogo-nextjs-api` - Puerto 3002 (externo)
- ✅ `catalogo-nextjs-db` - Puerto 5433 (externo)

---

## 🔍 Verificar que Funciona

### Frontend
```bash
curl http://localhost:3000
# O abre en navegador: http://localhost:3000
```

### API
```bash
curl http://localhost:3002/health
```

### Logs
```bash
# Logs del frontend
docker logs -f catalogo-nextjs-frontend

# Logs del API
docker logs -f catalogo-nextjs-api
```

---

## 🚀 Comandos Útiles

### Detener servicios
```bash
docker-compose down
```

### Reiniciar servicios
```bash
docker-compose restart
```

### Reconstruir
```bash
docker-compose up --build -d
```

### Ver logs
```bash
docker-compose logs -f
```

---

## ⚠️ Notas Importantes

1. **Puertos diferentes:** Los servicios nuevos usan puertos diferentes para no conflictuar con los del proyecto anterior
2. **Redes:** Cada proyecto tiene su propia red Docker
3. **Volúmenes:** Cada proyecto tiene su propio volumen de PostgreSQL

---

## 🎯 Para Producción (Cloud Run)

En Cloud Run no hay conflictos de puertos porque:
- Cada servicio tiene su propia URL
- No hay puertos compartidos
- Los servicios se comunican por nombres de servicio o URLs

---

¡Todo debería estar funcionando ahora! 🎉

