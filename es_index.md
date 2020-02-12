---
layout: page
permalink: /es_index
---
Helmet te ayuda incrementar la seguridad de tu aplicación basada en your Express seteando varias cabeceras (*headers*) HTTP. ¡*No es aprueba de balas*, pero puede ayudar!

Inicio Rápido
==============

Primero, corre `npm install helmet --save` para toda tu aplicación. Luego, en la aplicación de Express:

```javascript
const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())

// ...
```

¡Eso es todo! Helmet seteará varias cabeceras HTTP para ayudarte a protejer tu aplicación.

Cómo funciona
============

Helmet es una colección de 13 funciones middleare más pequeñeas que setean cabeceras en las respuestas HTTP. Por defecto, ejecutar `app.use(helmet())` no las incluirá a todas.

Puedes ver más acerca de ésto en [la documentación](/docs/es).

| Módulo | ¿Por defecto? |
|---|---|
| [contentSecurityPolicy](/docs/es/csp/) para setear "Content Security Policy" |  |
| [dnsPrefetchControl](/docs/es/dns-prefetch-control) controla la función "DNS prefetching" del navegador | ✓ |
| [expectCt](/docs/es/expect-ct/) para el manejo de "Certificate Transparency" |  |
| [featurePolicy](/docs/es/feature-policy/) para limitar las funcionalidades de tu sitio |  |
| [frameguard](/docs/es/frameguard/) para prevenir secuestros de click (*clickjacking*) | ✓ |
| [hidePoweredBy](/docs/es/hide-powered-by) para remover la cabecer "X-Powered-By" | ✓ |
| [hsts](/docs/es/hsts/) para "HTTP Strict Transport Security" | ✓ |
| [ieNoOpen](/docs/es/ienoopen) setea "X-Download-Options" para IE8+ | ✓ |
| [noCache](/docs/es/nocache/) para inhabilitar el cacheo del lado del cliente ("*client-side caching*")|  |
| [noSniff](/docs/es/dont-sniff-mimetype) para evitar el husmeo de "MIME type" | ✓ |
| [permittedCrossDomainPolicies](/docs/es/crossdomain/) para el manejo de las peticiones de dominio cruzado de Adobe products'  |  |
| [referrerPolicy](/docs/es/referrer-policy) para cultar la cabecera "Referer" |  |
| [xssFilter](/docs/es/xss-filter) añade algunas pequeñas protecciones contra los ataques XSS | ✓ |
