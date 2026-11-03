# LatAnime

Plugin de Kino: anime en español latino, castellano o subtitulado de latanime.org.

- **Pantalla propia** (menú de Kino, como Latino y Xuper): un slider con los estrenos, pestañas Inicio, En emisión, Películas y Géneros, filas por género, "Continuar viendo" y un buscador con historial.
- **Header y ajustes:** el logo de LatAnime en la barra, un engranaje con la página de ajustes (servidor preferido) y los logos de título de TMDB sobre cada slide, cuando Kino puede buscarlos.
- **Carátulas:** las miniaturas de latanime.org están detrás de un desafío de Cloudflare que el cargador de imágenes de Kino (User-Agent de OkHttp) no pasa, y dan 403. Los pósters y los fondos del slider salen de TMDB a través de `kino.meta`, con el título limpio de "Latino", "Castellano", la temporada y "Película". Los títulos que TMDB no empareja (temporadas, estrenos muy nuevos) se quedan sin carátula. Se probó `imageSource` (el plugin sirve la miniatura): Kino no llega a pedirla desde una pantalla de plugin, así que se descartó.
- **Series:** cada anime muestra su ficha con sinopsis, géneros y la lista de episodios; el sitio publica el doblaje latino, el castellano y el subtitulado como títulos separados.
- **Servidores:** cada episodio trae varios (mp4upload, MixDrop, Hexload, StreamWish y familia, VidHide, VOE, Byse/Filemoon, Doodstream, SaveFiles y más). El mejor que abre reproduce y los demás quedan como copias en el menú Servidor. Mega no se soporta: cifra en el navegador.
- **Navegador oculto:** Doodstream y SaveFiles están detrás de un desafío de Cloudflare y solo abren con el navegador oculto de Kino (`"browser": true`; se aprueba al instalar).
- **Hosts:** el sitio, los reproductores y el video puede salir de otros hosts (`streamHosts: any`, aviso en rojo al instalar).
- Los extractores salen del plugin Latino; Byse, Uqload, Streamtape, Doodstream, MixDrop, Mp4Upload, Hexload y SaveFiles se escribieron a partir de la lógica del repo de CloudStream.

## Estado

0.2.0. Verificado con el ejecutor del kit contra el sitio real: catálogo, búsqueda, episodios, la pantalla (carga de una pestaña y su dibujo) y la resolución (mp4upload, MixDrop y Hexload resuelven a un MP4). No probado en un aparato.

## Construir y probar

```bash
npm run build      # empaqueta src/plugin.js en plugin.js con esbuild
node sdk/validate.mjs .
node --test test/plugin.test.mjs
```
