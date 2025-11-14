# 📋 Comandos para Subir a GitHub

## ✅ Estado Actual

- ✅ Repositorio Git inicializado
- ✅ Archivos agregados al staging
- ✅ Commit inicial realizado

---

## 🚀 Pasos para Subir a GitHub

### 1. Crear Repositorio en GitHub

1. Ve a: https://github.com/new
2. **Nombre del repositorio:** `catalogo-productos-nextjs` (o el que prefieras)
3. **Descripción:** "Catálogo de productos con Next.js, React y TypeScript"
4. **Visibilidad:** Público o Privado (tu elección)
5. **NO marques** "Add a README file" (ya tenemos uno)
6. **NO marques** "Add .gitignore" (ya tenemos uno)
7. Haz clic en **"Create repository"**

### 2. Conectar y Subir

**Reemplaza `TU_USUARIO` con tu usuario de GitHub:**

```bash
cd C:\Bitbucket\test_loera\catalogo-productos-nextjs

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/catalogo-productos-nextjs.git

# Cambiar a rama main
git branch -M main

# Subir código
git push -u origin main
```

**Si te pide credenciales:**
- Usa un **Personal Access Token** (no tu contraseña)
- Crea uno en: https://github.com/settings/tokens
- Permisos necesarios: `repo`

---

## 🔄 Comandos para Futuros Cambios

```bash
# 1. Ver estado
git status

# 2. Agregar cambios
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub
git push origin main
```

---

## 📝 Notas Importantes

- ✅ `.env.local` NO se subirá (está en .gitignore)
- ✅ `node_modules/` NO se subirá
- ✅ `.next/` NO se subirá
- ✅ Solo se sube el código fuente

---

## 🌐 Próximo Paso: Desplegar en Render

Una vez subido a GitHub, sigue la guía:
- `GUIA-GITHUB-RENDER.md` - Guía completa de despliegue

