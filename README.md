# Soporte Técnico Donoso e Hijos — Sitio Web
Sitio estático listo para publicar (HTML/CSS/JS).

## Publicar gratis con GitHub Pages
1. Crea un repositorio y sube los archivos.
2. En **Settings → Pages** selecciona `main` y carpeta `/root`.
3. La web quedará en `https://TUUSUARIO.github.io/NOMBRE`.

## Publicar con Netlify (fácil)
1. Ve a https://app.netlify.com y crea cuenta.
2. **Add new site → Deploy manual** y arrastra esta carpeta.
3. Conecta dominio en **Domain settings** si quieres `midominio.cl`.

## Personalización rápida
- Cambia correo en `index.html` (sección Contacto).
- Reemplaza imágenes en `/assets` por fotos reales (mismo nombre).
- Edita meta `<title>` y `description` para SEO.


## Formulario con envío a correo
### Opción A) Formspree (sirve en cualquier hosting)
1. Crea una cuenta en https://formspree.io y crea un formulario.
2. Copia tu endpoint (ej: `https://formspree.io/f/abcdjwxy`).
3. En `index.html`, busca el `<form ... action="https://formspree.io/f/xxxxx">` y reemplaza `xxxxx` por tu ID.
4. Listo. Te llegarán los mensajes a tu correo.

### Opción B) Netlify Forms (si publicas en Netlify)
1. Elimina el `action="..."` del `<form>` y deja: `<form id="form" name="contacto" data-netlify="true" netlify-honeypot="bot-field">`.
2. Agrega `<input type="hidden" name="form-name" value="contacto">` dentro del formulario.
3. Publica en Netlify. Verás los envíos en **Forms** y puedes activar notificaciones por email.



---

## Guía de publicación con dominio propio (.cl)

### Opción 1: **Netlify** (recomendada por facilidad)
1. Ve a **Netlify → Add new site → Deploy manually** y arrastra la carpeta del proyecto.
2. En **Site settings → Domain management** agrega tu dominio `tudominio.cl`.
3. En tu proveedor de DNS (ej. **NIC Chile** o donde tengas tu dominio) crea:
   - **CNAME** para `www` → `tu-sitio.netlify.app` (te lo muestra Netlify).
   - **A** para el dominio raíz (apex) `tudominio.cl` → **75.2.60.5** y **99.83.190.102** (IPs públicas de Netlify).
4. Espera la propagación DNS y activa HTTPS en **Domain management**.

> Nota: Las IPs podrían cambiar con el tiempo; verifica en la documentación de Netlify.

### Opción 2: **GitHub Pages** (gratis)
1. Crea un repo y sube el contenido (carpeta raíz con `index.html`, etc.).
2. En **Settings → Pages** selecciona **Source: `main`** y **Folder: `/root`**.
3. Para dominio propio:
   - En tu DNS:
     - **A** (apex) `tudominio.cl` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153.
     - **CNAME** `www` → `TUUSUARIO.github.io`.
   - En el repo, crea un archivo **CNAME** con tu dominio (`tudominio.cl`), o renombra `CNAME.sample` a `CNAME`.
4. Espera la propagación y confirma HTTPS en **Pages**.

### Extras incluidos
- `robots.txt` y `sitemap.xml` listos (edita `tudominio.cl` si cambias de dominio).
- `netlify.toml` y `_redirects` para redirecciones/seguridad en Netlify.
- `CNAME.sample` para GitHub Pages.
