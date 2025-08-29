# Guía de publicación — Soporte Técnico Donoso e Hijos

Fecha: 2025-08-29

## Opción A) Publicar en Netlify (recomendado)
1. Crea cuenta en https://app.netlify.com
2. **Add new site → Deploy manually** y arrastra la carpeta completa del sitio.
3. En **Site configuration → Domain management → Add custom domain**, escribe tu dominio (ej.: `tudominio.cl`) y confirma.
4. Netlify te mostrará cómo conectar el dominio (puedes usar:
   - **Netlify DNS** (cambiar `nameservers` en tu registrador a los que te indique Netlify), o
   - Mantener tu DNS actual y crear los **registros CNAME/A** que te indique la pantalla de Netlify.
5. Cuando Netlify diga **Verified**, estará activo el HTTPS automático (Let's Encrypt).

**Headers de seguridad:** ya incluimos un archivo `_headers` con buenas prácticas (HSTS, X-Content-Type-Options, etc.).

## Opción B) Publicar en GitHub Pages (gratis)
1. En GitHub, crea un repositorio y sube todos los archivos del sitio.
2. En el repo: **Settings → Pages** → Source: `main` y carpeta `/root`.
3. (Opcional) Para usar tu dominio:
   - Crea un archivo `CNAME` en la raíz con solo: `tudominio.cl` (reemplázalo por tu dominio real).
   - En tu DNS, crea:
     - CNAME para `www` apuntando a `TUUSUARIO.github.io`
     - Registros A para el dominio raíz (`@`) a las IPs que GitHub Pages te muestre en **Settings → Pages** (aparecen en la interfaz).
4. Espera que cargue el certificado HTTPS (GitHub puede tardar unos minutos).

## Sitemap y robots
- Edita `public/sitemap.xml` y `public/robots.txt` si cambias la estructura o el dominio.
- Asegúrate de reemplazar `https://tudominio.cl` por tu dominio real.

## Formulario de contacto
- Si usas **Formspree**: en `index.html` reemplaza `https://formspree.io/f/xxxxx` por tu endpoint.
- Si usas **Netlify Forms**: ver instrucciones en `README.md` del proyecto.

## Analítica y Pixel
- En `partials/analytics.html` hay snippets (desactivados) para **Google Analytics (GA4)** y **Meta Pixel**. Reemplaza los IDs y descomenta.

## SEO básico
- Asegúrate que el `<title>` y la `<meta name="description">` en `index.html` estén correctos.
- Cada post del blog tiene su `<meta name="description">` editable.

