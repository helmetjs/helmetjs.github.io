---
layout: page
title: X-Permitted-Cross-Domain-Policies
permalink: /translations/es/crossdomain/
---
Brevemente: La función *middleware* `crossdomain` de Helmet previene que Adobe Flash y Adobe Acrobat carguen contenido en tu sitio.

El "ataque"
------------
Limitar el área superficial de tu código es una buena idea. Menos cosas implican menos ataques.

Adobe Flash y Adobe Acrobat pueden cargar contenido en tu dominio incluso desde otros sitios (en otras palabtas, "*cross-domain*"). Esto podría causar inesperadas filtraciones de datos o un uso excesivo del ancho de banda.

La cabecera
----------

La cabecera `X-Permitted-Cross-Domain-Policies` dice a los clientes Flash and Acrobat qué políticas de dominio cruzado ("*cross-domain*) pueden usar. Si no quieres que carguen contenido desde tu dominio, setea el valor de ésta cabecera a `none`. Por Ejemplo:

```
X-Permitted-Cross-Domain-Policies: none
```
Si flash carga algo desde tu sitio y ve eso, entonces sabrá que no debe cargar contenido desde tu dominio.

La cabecera posee otros valores que requieren la creación de un archivo `crossdomain.xml` que defina cuáles son tus políticas de dominio cruzado (*"cross-domain"*). Puedes leer más al respecto en los enlaces de abajo.

Para más información:

- ["X-Permitted-Cross-Domain-Policies" sección en OWASP](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project#xpcdp)
- [Especificaciones de Adobe para las políticas de dominio cruzado](https://www.adobe.com/devnet-docs/acrobatetk/tools/AppSec/xdomain.html)

El código
--------

La función middleware `crossdomain` de Helmet puede ayudarte a setear ésta cabecera.

Puedes usar éste módulo como una parte de Helmet:

```javascript
// Asegúrate de ejecutar "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

app.use(helmet.permittedCrossDomainPolicies())
```

Tambien puedes utilizarlo como un módulo independiente:

```javascript
// Asegúrate de ejecutar "npm install helmet-crossdomain" para obtener éste paquete.
const permittedCrossDomainPolicies = require('helmet-crossdomain')

app.use(permittedCrossDomainPolicies())
```

Por defecto el valor de ésta cabecera es `none`. También puedes asignar otros valores a ésta cabecera:

```javascript
app.use(permittedCrossDomainPolicies({ permittedPolicies: 'master-only' }))
app.use(permittedCrossDomainPolicies({ permittedPolicies: 'by-content-type' }))
app.use(permittedCrossDomainPolicies({ permittedPolicies: 'all' }))
```
