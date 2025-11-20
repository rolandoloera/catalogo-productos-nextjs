/**
 * Script para crear iconos PWA básicos
 * Genera iconos simples con un fondo morado y emoji
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// SVG base para los iconos
const createSVG = (size, emoji = '🛍️') => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#9333ea"/>
  <text x="50%" y="50%" font-size="${size * 0.6}" text-anchor="middle" dominant-baseline="middle" fill="white">${emoji}</text>
</svg>`;
};

// Tamaños requeridos
const iconSizes = [
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 16, name: 'favicon-16x16.png' },
];

async function createIcons() {
  try {
    console.log('🎨 Creando iconos PWA básicos...\n');

    // Si sharp está disponible, usarlo para convertir SVG a PNG
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {
      console.log('⚠️  Sharp no está instalado. Creando SVGs en su lugar...');
      console.log('💡 Instala sharp para generar PNGs: npm install sharp --save-dev\n');
      
      // Crear SVGs como alternativa
      iconSizes.forEach(({ size, name }) => {
        const svgName = name.replace('.png', '.svg');
        const svgContent = createSVG(size);
        const svgPath = path.join(publicDir, svgName);
        fs.writeFileSync(svgPath, svgContent);
        console.log(`✅ Creado: ${svgName} (${size}x${size})`);
      });
      
      console.log('\n⚠️  Nota: Los navegadores modernos aceptan SVG, pero para mejor compatibilidad,');
      console.log('   instala sharp y ejecuta este script nuevamente para generar PNGs.');
      return;
    }

    // Generar PNGs con sharp
    for (const { size, name } of iconSizes) {
      const svgBuffer = Buffer.from(createSVG(size));
      const outputPath = path.join(publicDir, name);
      
      await sharp(svgBuffer)
        .resize(size, size)
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

createIcons();

