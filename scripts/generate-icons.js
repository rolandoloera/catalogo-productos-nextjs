/**
 * Script para generar iconos PWA
 * 
 * Este script genera los iconos necesarios para la PWA
 * a partir de una imagen fuente.
 * 
 * Requiere: sharp (npm install sharp --save-dev)
 * 
 * Uso:
 * 1. Coloca una imagen fuente (icon-source.png) de 512x512px en /public
 * 2. Ejecuta: node scripts/generate-icons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const sourceImage = path.join(publicDir, 'icon-source.png');

// Tamaños de iconos requeridos
const iconSizes = [
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 16, name: 'favicon-16x16.png' },
];

async function generateIcons() {
  try {
    // Verificar que existe la imagen fuente
    if (!fs.existsSync(sourceImage)) {
      console.error('❌ Error: No se encontró icon-source.png en /public');
      console.log('📝 Crea una imagen de 512x512px y guárdala como icon-source.png en /public');
      process.exit(1);
    }

    console.log('🎨 Generando iconos PWA...\n');

    // Generar cada tamaño
    for (const { size, name } of iconSizes) {
      const outputPath = path.join(publicDir, name);
      
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center',
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generado: ${name} (${size}x${size})`);
    }

    console.log('\n✨ ¡Iconos generados exitosamente!');
    console.log('📱 Tu PWA ahora tiene todos los iconos necesarios.');
    
  } catch (error) {
    console.error('❌ Error generando iconos:', error.message);
    process.exit(1);
  }
}

generateIcons();

