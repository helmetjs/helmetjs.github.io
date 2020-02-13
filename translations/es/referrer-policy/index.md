---
layout: page
title: Referrer Policy
permalink: /translations/es/referrer-policy/
---
Brevemente: el módulo "*Referrer Policy*" puede controlar el comportamiento de la cabecera `Referer` seteando la cabecera `Referrer-Policy`.

El Ataque
----------

La [cabecera HTTP`Referer`](https://en.wikipedia.org/wiki/HTTP_referer) normalmente es seteada por los navegadores para informar al servidor de dónde vienen. Por ejemplo, si haz hecho click en un enlace dentro de `example.com/index.html` y eso te lleva hacia `wikipedia.org`, Los servidores de Wikipedia verán lo siguiente `Referer: example.com`.

Esto puede tener implicancias que respectan a la privacidad, debido a que los servidores y sitios web pueden inferir desde dónde vienen los usuarios.

Para más información:

- [Referer header specification](https://tools.ietf.org/html/rfc7231#section-5.5.2)
- ["HTTP referer" on Wikipedia](https://en.wikipedia.org/wiki/HTTP_referer)

La cabecera
----------

La nueva cabecera HTTP [`Referrer-Policy`](https://www.w3.org/TR/referrer-policy/#referrer-policy-header) permite que los autores controlen cómo los navegadores seteanla cabecera `Referer`.

Por ejemplo, cuando un navegador que soporta ésta funcionalidad ve ésta cabecera `Referrer-Policy` entonces no setearán ninguna cabecera `Referer`:

```
Referrer-Policy: no-referrer
```

Existen otras directivas también. `same-origin`, por ejemplo, sólo enviará la cabecera `Referer` a paginas que posean el mismo origen.

```
Referrer-Policy: same-origin
```

Puedes ver la lista completa de directivas en [en la escpecificación del protocolo](https://www.w3.org/TR/referrer-policy/#referrer-policies).

El soporte de ésta funcionalidad no es homogéneo.

Para más información:

- [Referrer-Policy specification](https://www.w3.org/TR/referrer-policy/#referrer-policy-header)
- [Can I Use Referrer Policy](http://caniuse.com/#feat=referrer-policy)

El código
--------

El módulo *Referrer Policy* de Helmet es una función middleware relativamente sencilla que setea la cabecera `Referrer-Policy`.

Puedes utilizar éste módulo como parte de Helmet:

```javascript
// Asegúrate de haber ejecutado "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

// Setea "Referrer-Policy: same-origin".
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
```

También puedes usar éste módulo en solitario

```javascript
// Asegúrate de haber ejecutado "npm install referrer-policy" para obtener el paquete.
const referrerPolicy = require('referrer-policy')

// Setea "Referrer-Policy: no-referrer".
app.use(referrerPolicy({ policy: 'no-referrer' }))
```

Una vez que lo hayas requerido, puedes usarlo en tus aplicaciones:

```javascript
// Setea "Referrer-Policy: same-origin".
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

// Setea "Referrer-Policy: unsafe-url".
app.use(helmet.referrerPolicy({ policy: 'unsafe-url' }))

// Setea "Referrer-Policy: no-referrer,unsafe-url"
app.use(helmet.referrerPolicy({
  policy: ['no-referrer', 'unsafe-url']
}))

// Setea "Referrer-Policy: no-referrer".
app.use(helmet.referrerPolicy())
```

Esta cabecera **no está incluida** por defecto en el paquete de Helmet.