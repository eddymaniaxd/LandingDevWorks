// Configuración de PM2 para correr el sitio en el VPS.
// Uso: pm2 start ecosystem.config.cjs
//
// -r dotenv/config carga automáticamente el archivo .env que vive en la raíz
// del proyecto (mismo directorio que este archivo) y lo vuelca a
// process.env antes de arrancar el servidor — así las variables como
// GMAIL_APP_PASSWORD o PUBLIC_WHATSAPP_NUMBER quedan disponibles en tiempo
// de ejecución, igual que en desarrollo local.
module.exports = {
  apps: [
    {
      name: "devworks-landing",
      script: "./dist/server/entry.mjs",
      node_args: "-r dotenv/config",
      env: {
        HOST: "0.0.0.0",
        PORT: "4321",
        NODE_ENV: "production",
      },
      // Reinicia solo, pero no en bucle si crashea muy seguido.
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
