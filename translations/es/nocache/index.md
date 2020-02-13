---
layout: page
title: No Cache
permalink: /translations/es/nocache/
---
Brevemente: la función middleware `nocache`apunta a deshabilitar el cacheo del navegador mediante el seteo de varias cabeceras.

El ataque
------------

Éste módulo no protege de un ataque específico. En cambio, previene a los usuarios de obtener versiones cacheadas de tus archivos (como viejos archivos de javascript).

Por ejemplo, imagina que tienes una aplicación de front-end que sirve Javascript. Un día descubres que una de tus librerías posée una vulnerabilidad, así que la actualizas en conjunto con tu sitio. Desafortunadamente, hay muchas posibilidades de que un usuario obtenga una versión *vieja*, cacheada, de tu código, lo que implicaría una posible vulnerabilidad.

Cachear tiene muchas ventajas y beneficios, pero también puede ser el causante de que algunos usuarios sean provistos de versiones desactualizadas de tu sitio.

Las cabeceras
-----------

Éste módulo trabaja con cuatro cabeceras encargadas de hacer el cacheo.

1. `Cache-Control` es una cabecera que incluye varias directivas. Por ejemplo, `Cache-Control: max-age=864000` instuirá a los navegadores a guardar una respuesta por 10 días. En esos 10 días los navegadores usarán aquellas versiones guardadas. Seteando esta cabecera a `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate` anulará el cacheo tanto dentro de las posibilidades que conciernen a ésta cabecera.
2. `Surrogate-Control` es otra cabecera que opera con las CDN. Puedes usarla para comunicar a los sistemas de intermediación que no hagan ningún tipo de cacheo.
3. `Pragma` es una cabecera actualmente considerada como *legacy*. Seteando `Pragma: no-cache` le dirá a los navegadores que aun utilizan ésta cabecera, que discontinúen el cacheo de las respuestas enviadas por el servidor. Posee menos funciones que `Cache-Control` pero tiene mejor soporte en los navegadores antiguos.
4. `Expires` especigica cuándo el contenido debe ser considerado desactualizado. Seteandolo a `0` informará a los navegadores que el contenido debe caducar de inmediato. En otras palabras, que no deben cachearlo.

La lista anterior no incluye la cabecera [ETag](https://en.wikipedia.org/wiki/HTTP_ETag), la cual es un mecanismo de cacheo bastante seguro.

Para más información:

* [Cache-Control RFC](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)
* [Pragma RFC](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.32)
* ["Cache control tutorial" on Fastly's documentation](https://docs.fastly.com/guides/tutorials/cache-control-tutorial)
* ["HTTP Caching" on Google Developers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)

El código
--------

La función middleware `noCache` de Helmet es relativamente simple y se encarga de setear las cuatro cabeceras mencionadas anteriormente: `Cache-Control`, `Surrogate-Control`, `Pragma`, y `Expires`.

Puedes usar éste módulo como parte de Helmpet:

```javascript
// Asegurate de haber ejecutado "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

app.use(helmet.noCache())
```

También puedes usar éste módulo en solitario:

```javascript
// Asegurate de haber ejecutado "npm install nocache" para obtener éste paquete.
const noCache = require('nocache')

app.use(noCache())
```

Ésta cabecera **no está incluida** por defecto dentro del paquete de Helmet.
