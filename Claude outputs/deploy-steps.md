# Desplegar devworks.lat en el VPS de Vultr

Sigue estos pasos en orden. Los pasos marcados **(PowerShell)** los corres en tu compu (Windows). Los marcados **(SSH / VPS)** los corres conectado al servidor.

## Paso 0 — Namecheap: apuntar el dominio al VPS

Esto hay que hacerlo primero porque tarda en propagarse (de unos minutos a un par de horas).

1. Entra a Namecheap → **Domain List** → click en `devworks.lat` → **Manage**.
2. Pestaña **Advanced DNS**.
3. Borra cualquier registro tipo "Parking Page" o A record que venga por defecto.
4. Agrega estos dos registros:

   | Tipo | Host | Valor | TTL |
   |------|------|-------|-----|
   | A Record | `@` | `207.246.108.156` | Automatic |
   | A Record | `www` | `207.246.108.156` | Automatic |

5. Guarda. Puedes seguir con los pasos de abajo mientras se propaga — solo el paso de SSL (Paso 4) necesita esperar a que ya funcione.

Para comprobar si ya propagó: abre PowerShell y corre `nslookup devworks.lat` — cuando la respuesta muestre `207.246.108.156`, ya está.

## Paso 1 — Preparar el servidor **(SSH / VPS)**

1. Conéctate al VPS desde PowerShell:
   ```
   ssh root@207.246.108.156
   ```
   Te va a pedir la contraseña (la que me pasaste).

2. Sube el archivo `server-setup.sh` que te adjunté. La forma más simple: desde PowerShell, en otra ventana (sin cerrar la conexión SSH):
   ```
   scp C:\Users\Henry\Desktop\server-setup.sh root@207.246.108.156:/root/
   ```
   (ajusta la ruta si guardaste el archivo en otra carpeta, ej. Descargas)

3. De vuelta en la sesión SSH:
   ```
   chmod +x server-setup.sh
   ./server-setup.sh
   ```
   Esto instala Node.js, Nginx, PM2, Certbot, configura el firewall y deja todo listo. Tarda 2-5 minutos.

## Paso 2 — Subir el código del sitio **(PowerShell)**

**Importante:** no copies la carpeta `node_modules` — se instaló en Windows y no funciona en Linux (son binarios distintos). El servidor va a instalar sus propias dependencias con `npm install`.

Desde PowerShell, en tu compu:

```powershell
cd C:\Users\Henry\Desktop\devworks-landing
scp -r src public astro.config.mjs tsconfig.json package.json package-lock.json ecosystem.config.cjs .env root@207.246.108.156:/var/www/devworks-landing/
```

Esto sube el código fuente, los assets públicos (incluido el gif del inventario), la configuración y tu `.env` con las variables reales (WhatsApp, Gmail, Analytics).

## Paso 3 — Instalar, compilar y arrancar el sitio **(SSH / VPS)**

De vuelta en la sesión SSH:

```bash
cd /var/www/devworks-landing
npm install
npm run build:fast
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd
```

El último comando (`pm2 startup systemd`) va a imprimir una línea que empieza con `sudo env PATH=...` — cópiala y pégala tal cual para que el sitio arranque solo si el servidor se reinicia.

En este punto, si visitas `http://207.246.108.156` (sin HTTPS todavía) deberías ver el sitio funcionando ya a través de Nginx.

## Paso 4 — Activar HTTPS **(SSH / VPS)**

Solo cuando `devworks.lat` ya resuelva a `207.246.108.156` (ver Paso 0):

```bash
certbot --nginx -d devworks.lat -d www.devworks.lat
```

Te va a pedir un correo (para avisos de renovación) y que aceptes los términos. Certbot renueva el certificado solo cada ~60 días, no hay que hacer nada más.

Después de esto, `https://devworks.lat` debería cargar el sitio con candado verde.

## Paso 5 — Rotar la contraseña del VPS

La contraseña actual quedó escrita en este chat, así que cámbiala:

```bash
passwd
```

Te pide la nueva contraseña dos veces. Guárdala en un gestor de contraseñas (no me la vuelvas a pasar por chat).

---

## Para actualizaciones futuras

Cuando hagamos cambios al código (yo los aplico en tu carpeta local como siempre), para llevarlos a producción repites solo los Pasos 2 y 3 (sin necesidad de tocar Nginx, DNS ni SSL de nuevo):

```powershell
# (PowerShell) subir el código actualizado
cd C:\Users\Henry\Desktop\devworks-landing
scp -r src public astro.config.mjs package.json package-lock.json ecosystem.config.cjs root@207.246.108.156:/var/www/devworks-landing/
```

```bash
# (SSH / VPS) reconstruir y reiniciar
cd /var/www/devworks-landing
npm install
npm run build:fast
pm2 restart devworks-landing
```

## Comandos útiles de PM2

- `pm2 status` — ver si el sitio está corriendo
- `pm2 logs devworks-landing` — ver los logs en vivo (útil si algo falla)
- `pm2 restart devworks-landing` — reiniciar el sitio
