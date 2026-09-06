#!/usr/bin/env bash
# server-setup.sh — preparación inicial del VPS para devworks.lat
#
# Cómo correrlo:
#   1. Conéctate por SSH al VPS: ssh root@207.246.108.156
#   2. Sube este archivo (o pégalo con un editor: nano server-setup.sh)
#   3. chmod +x server-setup.sh && ./server-setup.sh
#
# Pensado para Ubuntu/Debian (la imagen por defecto de Vultr). Es seguro
# correrlo más de una vez (no rompe nada si ya estaba hecho algo).

set -euo pipefail

DOMAIN="devworks.lat"
APP_DIR="/var/www/devworks-landing"
APP_PORT="4321"

echo "==> Actualizando el sistema..."
apt-get update -y
apt-get upgrade -y

echo "==> Instalando dependencias base (curl, git, ufw)..."
apt-get install -y curl git ufw

echo "==> Instalando Node.js 20 LTS..."
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v20* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

echo "==> Instalando PM2 (mantiene el sitio corriendo y lo reinicia solo si crashea)..."
npm install -g pm2

echo "==> Instalando Nginx..."
apt-get install -y nginx

echo "==> Instalando Certbot (certificado SSL gratis de Let's Encrypt)..."
apt-get install -y certbot python3-certbot-nginx

echo "==> Configurando el firewall (ufw)..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo "==> Creando el directorio del sitio: $APP_DIR"
mkdir -p "$APP_DIR"

echo "==> Escribiendo la configuración de Nginx para $DOMAIN..."
cat > /etc/nginx/sites-available/"$DOMAIN" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/"$DOMAIN" /etc/nginx/sites-enabled/"$DOMAIN"
# Quita el sitio "default" de ejemplo de Nginx si existe, para que no compita.
rm -f /etc/nginx/sites-enabled/default

echo "==> Probando configuración de Nginx..."
nginx -t

echo "==> Recargando Nginx..."
systemctl reload nginx
systemctl enable nginx

echo ""
echo "========================================================"
echo " Listo. El servidor está preparado."
echo ""
echo " Siguiente paso: subir el código del sitio a $APP_DIR"
echo " (ver deploy-steps.md para los comandos exactos)."
echo "========================================================"
