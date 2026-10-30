# portfolioAC

Portfolio web de un jinete profesional: doma, entrenamiento y clases de equitación.
HTML, CSS y JS puros, sin dependencias ni build. Publicado con GitHub Pages.

## Personalizar

- **Datos** (nombre, bio, teléfono, email, WhatsApp, zona, redes): busca los comentarios `<!-- EDITAR -->` en `index.html`.
  - WhatsApp usa el formato `https://wa.me/34600000000` (prefijo del país + número, sin `+` ni espacios).
- **Fotos**: sustituye los placeholders `.svg` de `images/` por fotos reales (`.jpg`/`.webp`) y actualiza las rutas en `index.html`:
  - `images/hero.*`: foto principal (horizontal, ≥1920px de ancho)
  - `images/about.*`: retrato (vertical 4:5)
  - `images/gallery/01..09.*`: galería. Las marcadas con la clase `tall` ocupan dos filas (mejor en vertical).
  - Recomendación: comprimir a <300 KB cada una (p. ej. con squoosh.app).
- **Colores**: variables CSS en `:root`, al inicio de `css/styles.css`.

## Ver en local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Publicación

GitHub Pages sirve la rama `main` desde la raíz. Cada push a `main` actualiza la web en
https://javiercillo11.github.io/portfolioAC/
