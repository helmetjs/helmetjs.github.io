---
layout: page
title: IE No Open
permalink: /translations/es/ienoopen/
---
Brevemente: la función middleware `X-Download-Options` de Helmet previene que Internet Explorer ejecute descargas en el contexto de tu sitio to prevent Internet Explorer from executing downloads in your site's context.

El ataque
----------

Éste ataque sóloa fecta versiones antiguas de Internet Explorer.

Algunas aplicaciones web intentaran servir HTML no confiable para su descarga. Por ejemplo, podrías permitirle a los usuarios subir y bajar archivos HTML.

Por defecto, las versiones antiguas de Internet Explorer permiten abrir esos archivos HTML en el contexto de tu sitio, lo que implica que una página desconocida pueda realizar acciones maliciosas en el contexto de tus páginas. Para saber más, ver [este articulo de MSDN](https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/).

La cabecera
----------

La cabecera `X-Download-Options` puede ser asignada a `noopen`. Esto previene que las versiones antiguas de Internet Explorer descargue y ejecute archivos HTML en el contexto de tu sitio.

Para más información:

- ["IE8 Security Part V: Comprehensive Protection" on MSDN](https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/)

El código
--------

El middleware `ieNoOpen` de Helmet es una función relativamente sencilla que asignará la cabecera `X-Download-Options` a `noopen`.

Puedes utilizar éste módulo como parte de Helmet:

```javascript
// Asegúrate de haber ejecutado "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

// Asigna "X-Download-Options: noopen".
app.use(helmet.ieNoOpen())
```

Tambien puedes usar éste módulo en solitario:

```javascript
// Asegúrate de haber ejecutado "npm install ienoopen" para obtener el paquete.
const ieNoOpen = require('ienoopen')

// Asigna "X-Download-Options: noopen".
app.use(ieNoOpen())
```

Esta cabecera está incluida por defecto en el paquete de Helmet.
