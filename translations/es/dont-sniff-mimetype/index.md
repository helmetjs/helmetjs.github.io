---
layout: page
title: Don't Sniff Mimetype
permalink: /translations/es/dont-sniff-mimetype/
---

Brevemente: la funcción middleware "*Don't Sniff Mimetype middleware*", `noSniff`, ayuda a prevenir que los navegadores intenten inferir los *MIME type*, lo que puede tener implicancias en la seguridad. esto se realiza seteando la cabecera `X-Content-Type-Options` en `nosniff`.

El ataque
----------

Los *MIME types* son una forma de determinar qué tipo de archivo se está requiriendo. Las imágenes PNG tienen un tipo `image/png`; los archivos JSON son `application/json`; los archivos JavaScript típicamente son `text/javascript`. Para saber de qué se trata, cuando tu navegador carga un archivo suele leer la cabecera `Content-Type` enviada por el servidor.

Digamos que tu navegador ve esto:

```html
<script src="https://example.com/my-javascript"></script>
```
En éste caso, el navegador cargará `my-javascript` from `example.com`. Si `example.com` envía una cabecera `Content-Type` con el contenido `text/javascript`, el navegador ejecutará los contenidos de `my-javascript` como Javascript.

Pero que pasaría si `my-javascript` es una página HTML con un `Content-Type` seteado en `text/html`? Si tu navegador hace algo llamado "*MIME sniffing*" (algunos lo hacen), entonces se fijará en los contenidos de dicho archivo, decidirá si se parece a Javascript, y posteriormente lo ejecutará si así lo interpreta. Esto significa que un servidor puede enviar un `Content-Type` equivocado y que el contenido Javascript se ejecute de todas formas.

Este *Mime sniffing* puede ser un vector de ataques. un usuario podría subir una archivo con una extensión `.jpg`, pero con HTML en su contenido. Cargar esa página podría causar que el navegador "ejecute" la página HTML dentro del archivo... ¡El cuál podría contener Javascript malicioso! Quizás el ataque más sucio es conocido como [Rosetta Flash](https://miki.it/blog/2014/7/8/abusing-jsonp-with-rosetta-flash/), el cual permite que alguin logre cargar un *pluguin* malicioso de Flash.

Para más información:

- ["MIME type" on Wikipedia](https://en.wikipedia.org/wiki/Media_type)
- ["MIME Sniffing: feature or vulnerability?"](https://blog.fox-it.com/2012/05/08/mime-sniffing-feature-or-vulnerability/)
- ["MIME sniffing in Internet Explorer enables cross-site scripting attacks"](http://www.h-online.com/security/features/Risky-MIME-sniffing-in-Internet-Explorer-746229.html)
- ["Abusing JSONP with Rosetta Flash"](https://miki.it/blog/2014/7/8/abusing-jsonp-with-rosetta-flash/)
- [MIME Sniffing live standard](https://mimesniff.spec.whatwg.org/)
- [Cross Origin Resource Blocking in Chrome](https://developers.google.com/web/updates/2018/07/site-isolation)

La Cabecera
----------

La cabecera `X-Content-Type-Options` instruye al navegador para no husmear los *MIME types*. Cuando ésta cabecera está seteada en `nosniff`, El navegador dejará de hacerlo y confiará en lo que el servidor le informe, bloqueando el recurso en caso de no poseer el *MIME type* informado.

Para más información:

- ["X-Content-Type-Options" on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
- ["What is 'X-Content-Type-Options=nosniff'?" on Stack Overflow](https://stackoverflow.com/questions/18337630/)
- ["Reducing MIME type security risks" on MSDN](https://msdn.microsoft.com/en-us/library/gg622941(v=vs.85).aspx)
- ["IE8 Security Part V: Comprehensive Protection" on MSDN](https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/)

El código
--------

La función middleware `noSniff` asignará la cabecera `X-Content-Type-Options` a `nosniff` para todas las peticiones.

Puedes usar éste módulo como una parte de Helmet:

```javascript
// Asegurate de haber ejecutado "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

// Asigna "X-Content-Type-Options: nosniff".
app.use(helmet.noSniff())
```

También puedes usar éste módulo en solitario:

```javascript
// Asegurate de haber ejecutado "npm install dont-sniff-mimetype" para obtener éste paquete.
const noSniff = require('dont-sniff-mimetype')

// Asigna"X-Content-Type-Options: nosniff".
app.use(noSniff())
```

Esta cabecera está incluida por defecto en el paquete Helmet.