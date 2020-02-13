---
layout: page
title: HSTS
permalink: /translations/es/hsts/
---
Brevemente: éste módulo setea la cabecera `Strict-Transport-Security` para mantener a los usuarios bajo el protocolo HTTPS.

El ataque
----------

Aunque HTTPS no es perfecto, sigue siendo un protocolo seguro. Por el contrario HTTP es horrible. Dado que con éste último la información no es encriptada, los usuarios bajo HTTP "Vainilla" son vulnerables a ataques del tipo hombre-en-el-medio ("*men-in-the-middle*").

Si quisiera hackearte, siempre te preferiría en HTTP antes que HTTPS.

Para más información:

- ["HTTPS" on Wikipedia](https://en.wikipedia.org/wiki/HTTPS)
- ["Web Security: Why You Should Always Use HTTPS" on Mashable](http://mashable.com/2011/05/31/https-web-security/)

La cabecera
----------

La cabecera `Strict-Transport-Security` le indica al navegador que utilize HTTPS  nunca visite ningúna versión insegura sobre HTTP. Una vez que el navegador recibe ésta cabecera sólo visitará sitios utilizando HTTPS durante los próximos 60 días:

```
Strict-Transport-Security: max-age=5184000
```

Nota que ésta cabecera no le dirá a los usuarios en HTTP que *cambien* hacia HTTPS, simplemente le dirá a los que se encuentran usando HTTPS que se mantengan con ese protocolo. Puedes reforzar HTTPS utilizando el módulo [express-enforces-ssl](https://github.com/aredo/express-enforces-ssl).

Para más información:

- [Specification](https://tools.ietf.org/html/rfc6797)
- ["HTTP Strict Transport Security" on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/HTTP_strict_transport_security)
- ["HTTP Strict Transport Security Cheat Sheet" on OWASP](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)
- ["HTTP Strict Transport Security" on Wikpedia](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)

El código
--------

Helmet implementa una función middleware relativamente sencilla en su módulo HTST, la cual se encarga de setear la cabecera `Strict-Transport-Security`.

Puedes usar éste módulo como parte de Helmet:

```javascript
// Asegúrate de haber ejecutado "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

// Setea "Strict-Transport-Security: max-age=5184000; includeSubDomains".
const sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}))
```

También puedes utilizar éste módulo en solitario:

```javascript
// Asegúrate de haber ejecutado "npm install hsts" para obtener éste paquete.
const hsts = require('hsts')

// Setea "Strict-Transport-Security: max-age=5184000; includeSubDomains".
const sixtyDaysInSeconds = 5184000
app.use(hsts({
  maxAge: sixtyDaysInSeconds
}))
```

### Añadiendo subdominios

La directiva `includeSubDomains` es incluida por defecto. Si deseas no usarla puedes setear la opción `includeSubDomains` en `false`.

```javascript
// Setea "Strict-Transport-Security: max-age=5184000".
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds,
  includeSubDomains: false
}))
```

### Incluyendo la cabecera de manera condicional

Ésta cabecera siempre será implementada debido a que [la cabecera es ignorada bajo conexiones inseguras en HTTP](https://tools.ietf.org/html/rfc6797#section-8.1). Sin embargo, existe la posibilidad de que necesites setear éste comportamiento de manera dinámica:

```javascript
const hstsMiddleware = helmet.hsts({ /* ... */ })

app.use((req, res, next) {
  if (req.secure) {
    hstsMiddleware(req, res, next)
  } else {
    next()
  }
})
```

### Cargando HTST de manera anticipada en Chrome

Algunos navegadores permiten que las directivas HSTS de tu sitio sean respaldadas en el navegador. Puedes cargar anticipadamente añadiendo `preload` a la cabecera usando el siguiente código. Puedes verificar tu condición de elegibilidad y/o proponer tu sitio en [hstspreload.org](https://hstspreload.org/).

```javascript
app.use(helmet.hsts({
  // Debe ser al menos 1 año para ser aprobado
  maxAge: 31536000,

  // Debe estar habilitado para ser aprobado
  includeSubDomains: true,
  preload: true
}))
```
