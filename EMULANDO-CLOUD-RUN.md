# ☁️ Emulando Google Cloud Run Localmente

Este proyecto está configurado para emular Google Cloud Run usando Docker, lo cual es esencial para aprender Google Cloud Platform.

---

## 🎯 ¿Qué es Cloud Run?

**Google Cloud Run** es un servicio serverless que:
- Ejecuta contenedores Docker
- Escala automáticamente (0 a N instancias)
- Cobra solo por lo que usas
- Soporta HTTP/HTTPS requests
- Es compatible con Docker estándar

---

## 🐳 Configuración Docker para Cloud Run

### Estructura del Proyecto

```
catalogo-productos-nextjs/
├── Dockerfile              # Imagen Docker (Cloud Run compatible)
├── docker-compose.yml      # Orquestación local (emula Cloud Run)
├── .dockerignore          # Archivos a excluir del build
└── cloudbuild.yaml        # Para CI/CD con Google Cloud Build
```

### Dockerfile (Multi-stage Build)

El `Dockerfile` usa **multi-stage build** para optimizar:
1. **Stage 1 (deps)**: Instala dependencias
2. **Stage 2 (builder)**: Construye la aplicación Next.js
3. **Stage 3 (runner)**: Imagen final optimizada para producción

**Características Cloud Run:**
- ✅ Usa usuario no-root (seguridad)
- ✅ Expone puerto 3000 (configurable)
- ✅ Variables de entorno compatibles
- ✅ Build optimizado (standalone mode)

---

## 🚀 Ejecutar Localmente (Emulando Cloud Run)

### Opción 1: Docker Compose (Recomendado)

```bash
# Construir y ejecutar todos los servicios
docker-compose up --build -d

# Ver logs
docker-compose logs -f frontend

# Detener
docker-compose down
```

**Servicios incluidos:**
- `frontend` - Next.js (puerto 3000)
- `api` - Backend API (puerto 3001)
- `postgres` - Base de datos (puerto 5432)

### Opción 2: Solo el Frontend

```bash
# Construir imagen
docker build -t catalogo-nextjs .

# Ejecutar contenedor
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:3001 \
  catalogo-nextjs
```

---

## ☁️ Desplegar en Google Cloud Run

### Paso 1: Preparar Google Cloud

```bash
# Instalar Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# Autenticarse
gcloud auth login

# Configurar proyecto
gcloud config set project TU-PROJECT-ID
```

### Paso 2: Construir y Subir Imagen

```bash
# Construir imagen
docker build -t gcr.io/TU-PROJECT-ID/catalogo-nextjs .

# Subir a Google Container Registry
docker push gcr.io/TU-PROJECT-ID/catalogo-nextjs
```

### Paso 3: Desplegar a Cloud Run

```bash
gcloud run deploy catalogo-nextjs \
  --image gcr.io/TU-PROJECT-ID/catalogo-nextjs \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NEXT_PUBLIC_API_URL=https://tu-api.run.app,API_VERSION=v1"
```

### Paso 4: Obtener URL

Cloud Run te dará una URL como:
```
https://catalogo-nextjs-xxxxx-uc.a.run.app
```

---

## 🔄 CI/CD con Cloud Build

Usa `cloudbuild.yaml` para automatizar:

```bash
# Enviar a Cloud Build
gcloud builds submit --config cloudbuild.yaml
```

Esto automáticamente:
1. Construye la imagen Docker
2. La sube a Container Registry
3. La despliega en Cloud Run

---

## 📊 Comparación: Local vs Cloud Run

| Característica | Local (Docker) | Cloud Run |
|---------------|---------------|-----------|
| **Ejecución** | `docker-compose up` | Automático |
| **Escalado** | Manual | Automático (0-N) |
| **Costo** | Gratis (local) | Pago por uso |
| **URL** | `localhost:3000` | `*.run.app` |
| **Variables** | `.env` / docker-compose | Cloud Run env vars |
| **Logs** | `docker logs` | Cloud Console |

---

## 🎓 Conceptos de Cloud Run que Aprendes

### 1. Contenedores Docker
- ✅ Multi-stage builds
- ✅ Optimización de imágenes
- ✅ Variables de entorno
- ✅ Health checks

### 2. Serverless
- ✅ Escalado automático
- ✅ Pago por uso
- ✅ Sin servidores que gestionar

### 3. Integración con GCP
- ✅ Container Registry
- ✅ Cloud Build (CI/CD)
- ✅ IAM y seguridad
- ✅ Logging y monitoring

### 4. Networking
- ✅ Service-to-service communication
- ✅ Load balancing
- ✅ HTTPS automático

---

## 🔧 Variables de Entorno

### Local (docker-compose.yml)
```yaml
environment:
  - NEXT_PUBLIC_API_URL=http://api:3001
  - API_VERSION=v1
```

### Cloud Run
```bash
--set-env-vars "NEXT_PUBLIC_API_URL=https://api.run.app,API_VERSION=v1"
```

**Importante:** Variables que empiezan con `NEXT_PUBLIC_` son públicas y se incluyen en el build.

---

## 🐛 Troubleshooting

### Error: "Cannot connect to API"

**Solución:**
- En local: Usa `http://api:3001` (nombre del servicio)
- En Cloud Run: Usa la URL pública del API

### Error: "Port already in use"

**Solución:**
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "3001:3000"  # Host:Container
```

### Error: "Build failed"

**Solución:**
```bash
# Ver logs detallados
docker-compose build --no-cache frontend

# Verificar Dockerfile
docker build -t test .
```

---

## 📚 Recursos de Aprendizaje

- [Google Cloud Run Docs](https://cloud.google.com/run/docs)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)

---

## ✅ Checklist para Cloud Run

- [x] Dockerfile creado (multi-stage)
- [x] .dockerignore configurado
- [x] docker-compose.yml para desarrollo
- [x] Variables de entorno configuradas
- [x] Health checks implementados
- [x] Usuario no-root (seguridad)
- [ ] Desplegar en Cloud Run (próximo paso)
- [ ] Configurar CI/CD con Cloud Build

---

¡Ahora sí estás emulando Cloud Run! 🚀

