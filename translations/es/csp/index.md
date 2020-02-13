---
layout: page
title: Content Security Policy
permalink: /translations/es/csp/
---
Brevemente: el módulo CSP setea la cabecera `Content-Security-Policy`, la cual puede ayudar a proteger contra inyecciones maliciosas de Javascript, CSS, *pluguins*, y más.

El ataque
----------
Los hackers pueden realizar numerosas maldades si logran poner cosas en tus páginas.

El ataque más sucio es probablemente el *cross-site scripting* (XSS), el cual ocurre cuando un hacker pone código malicioso en tu sitio. Si yo puedo ejecutar Javascript en tu página, entonces puedo hacer cosas malas ahí, desde robar cookies de autenticación hasta registrar las acciones de todos los usuarios.

Existen otras cosas que los atacantes pueden hacer, incluso si no pueden ejecutar Javascript. por ejemplo, si uno pudiera poner una pequeña imagen en tu sitio, 1x1 y transparente, podría tener una buena idea de cuánto tráfico llega a tu sitio. Si uno pudiera lograr que el navegador corriera un [pluguin vulnerable](http://arstechnica.com/security/2015/07/two-new-flash-exploits-surface-from-hacking-team-combine-with-java-0-day/) como flash, entonces podría explotar sus falencias y realizar acciones que desearías evitar.

El módulo CSP no proteje contra un ataque específico. Aquí lo principal es que no quieres a nadie poniendo nada inesperado dentro de tus sitios.

Leer más:

* [Cross-site scripting en Wikipedia](https://en.wikipedia.org/wiki/Cross-site_scripting)
* [Cross-site Scripting en OWASP](https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29)
* ["How does a tracking pixel work?" en Quora](https://www.quora.com/How-does-a-tracking-pixel-work)

La Cabecera
----------

Una de las complicaciones acerca de éstas ataques de inyección de código es que los navegadores no saben qué es bueno y qué es malo. ¿Cómo podría diferenciar entre un archivo de Javascript legítimo y uno malicioso? En muchos casos, no puede... a menos que yu hayas definido *"Content Security Policy*. 

La mayoría de los navegadores modernos soportan la cabecera llamada `Content-Security-Policy`, la cual efectivamente es una lista blanca de las cosas que tienen permitido estar en tu página. Podes permitir Javascript, CSS, imágenes, *pluguins*, y mucho más. Aquí las cosas están "*opt-in*", lo que significa que creas una lista de "**cosas que están permitidas**", en vez de crear una lista de **cosas que NO están permitidas**.

Digamos que tienes un sitio que no posee enlaces a ningún recurso externo, sólo tus cosas. En ésta situacion podrías setear una cabecera que luzca como ésta:

```
Content-Security-Policy: default-src 'self'
```

Esto efectivamente le dice al navegador "sólo carga cosas que sean de mi propio dominio". Si estás corriendo *ejemplo.com* y un usuario trata de cargar `https://ejemplo.com/mi-javascript.js`, entonces todo va a ejecutarse bien. ¡Pero si un usuario trata de ejecutar `https://maligno.com/maligno.js`, entonces nada va a cargarse!

Ahora, digamos que sí quieres permitir la carga de CSS de Bootstrap desde su CDN. Entonces podrías setear una CSP que luzca como ésta:

```
Content-Security-Policy: default-src 'self'; style-src 'self' maxcdn.bootstrapcdn.com
```

Ahora `'self'` y `maxcdn.bootstrapcdn.com` en nuestra lista blanca. los usuarios podrán cargar CSS desde ahí, pero desde ningún otro lugar. Los usuarios ni siquiera tendrán permitido cargar Javascriot o imágenes desde la nueva CDN, sólamente hojas de estilo.

Existen muchos matices y sutilezas para CSP: cosas que puedes y no puedes poner en tus listas blancas, sin embargo, los navegadores ofrecen varias prestaciones e incluso cabeceras alternativas para los límites de CSP. Refiérete a los enlaces de abajo para más información.

Leer más:

- [Una introducción a Content Security Policy en "HTML5 Rocks"](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)
- [Referencia de Content Security Policy](https://content-security-policy.com/)
- [Can I Use Content Security Policy 1.0](http://caniuse.com/#feat=contentsecuritypolicy)
- [Can I Use Content Security Policy 2.0](http://caniuse.com/#feat=contentsecuritypolicy2)

El código
--------

El módulo `csp` de Helmet ayuda a setear la cabecera *"Content Security Policies"*.

Puedes usar éste módulo como una parte de Helmet:

```javascript
// Asegurate de haber ejecutado "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}))
```

También puede usar el módulo en solitario:

```javascript
// Asegurate de haber ejecutado "npm install helmet-csp" para obtener el paquete de CSP.
const csp = require('helmet-csp')

app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}))
```

Esta cabecera no está incluida por defecto en Helmet.

### Directivas

Todas tus directivas hacia CSP (like `default-src`, `style-src`) están ubicadas en la opción `directives`.

```javascript
app.use(csp({
  directives: {
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false  // Esto no está seteado.
  }
}))
```

Las directivas pueden estar separadas por guiones (como `script-src`) o usar *camel case* (como `scriptSrc`); ambas son equivalentes.

Las siguientes directivas están soportadas:

* `base-uri` o `baseUri`
* `block-all-mixed-content` o `blockAllMixedContent`
* `child-src` o `childSrc`
* `connect-src` o `connectSrc`
* `default-src` o `defaultSrc`
* `font-src` o `fontSrc`
* `form-action` o `formAction`
* `frame-ancestors` o `frameAncestors`
* `frame-src` o `frameSrc`
* `img-src` o `imgSrc`
* `manifest-src` o `manifestSrc`
* `media-src` o `mediaSrc`
* `object-src` o `objectSrc`
* `plugin-types` o `pluginTypes`
* `prefetch-src` o `prefetchSrc`
* `report-to` o `reportTo`
* `report-uri` o `reportUri`
* `require-sri-for` o `requireSriFor`
* `sandbox` o `sandbox`
* `script-src` o `scriptSrc`
* `style-src` o `styleSrc`
* `upgrade-insecure-requests` o `upgradeInsecureRequests`
* `worker-src` o `workerSrc`

### Violaciones de CSP

Si has especificado una violación de las políticas de seguridad de contendio ("*CSP Violations*") usando `reportUri`, los navegadores realizaran una petición POST a tu servidor con el contenido de las violaciones a CSP. He aquí un ejemplo simple de una ruta de Express encargada de manejar esas peticiones:

```js
// Necesitarás JSON parser primero.
app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}))

app.post('/report-violation', (req, res) => {
  if (req.body) {
    console.log('CSP Violation: ', req.body)
  } else {
    console.log('CSP Violation: No data received!')
  }

  res.status(204).end()
})
```

No todos los navegadores envían las violaciones a la política de seguridad de contenidos ("*CSP Violations*") de la misma forma, por lo que ésto quizás requiera un trabajo un poco más específico.

*Nota*: Si estas usando un modulo CSRF como [csurf](https://github.com/expressjs/csurf), puede que tengas problemas manejando éste tipo de violaciones sin un token valido de CRSF. Para arreglar esto pon tu ruta de reportes de CSP antes de tu tu función middleware de *csurf*.

La opción `reportOnly` de éste módulo se encarga de cambiar la cabecera a `Content-Security-Policy-Report-Only`. Esto instruye a los navegadores a reportar las violaciones a la dirección especificada en `reportUri` (en caso de estar especificada) pero no denegará la carga de ningún recurso.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  reportOnly: true
})
```
Tambén puedes asignar esto a una función para decidir de manera dinámica cuándo usar el modo `reportOnly`. Puedes usar ésto como un disyuntor dinámico. En éste caso, la función es llamada usando los objetos "*request*" y "*response*" y debe retornar una variable de tipo *Boolean*.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  reportOnly: (req, res) => req.query.cspmode === 'debug'
})
```

### Browser sniffing (detección de navegadores).

Por defecto, éste módulo se fijará en la cabecera `User-Agent` entrante y enviará diferentes cabeceras dependiendo en el navegador detectado. por ejemplo, las versiones previas a Chrome 25 usan una cabecera alternativa llamada `X-WebKit-CSP`, el cuál también es manejado por éste módulo. Si ningún navegador es detectado, entonces las cabeceras serán seteadas con las especificaciones 2.0.

Para deshabilitar la detección de navegadores y asumir todas las peticiones desde navegadores modernos, es necesario setear la opción `browserSniff` en `false`.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  browserSniff: false
})
```
Para setear todas las cabeceras, incluidas las que son *legacy*, asigna la opción `setAllHeaders` en `true`. Observa que esto cambiará el valor de las demás cabeceras basadas en `User-Agent`. Puedes deshabilitar esto usando la opción `browserSniff: false` como es indicado abajo:

```javascript
app.use(csp({
  directives: {
    // ...
  },
  setAllHeaders: true
})
```
Los navegadores Android antiguos pueden estan un poco "buggeados", así que esto está seteado como `false` por defecto.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  disableAndroid: true
})
```

### Generando instancias

Puedes generar instancias de forma dinámica para permitir que los bloques `<script>` sean evaluados de manera segura. He aquí un ejemplo:

```js
const uuidv4 = require('uuid/v4')

app.use(function (req, res, next) {
  res.locals.nonce = uuidv4()
  next()
})

app.use(csp({
  directives: {
    scriptSrc: [
      "'self'",
      (req, res) => `'nonce-${res.locals.nonce}'`  // 'nonce-614d9122-d5b0-4760-aecf-3a5d17cf0ac9'
    ]
  }
}))

app.use(function (req, res) {
  res.end(`<script nonce="${res.locals.nonce}">alert(1 + 1);</script>`)
})
```

### Usando CSP con una CDN

Por defecto el comportamiento de las CSP es generar cabeceras adaptadas para el navegador que está haciendo las peticiones a tu sitio. Si estás usando una CDN en frente de tu aplicación, la CDN puede que cachée las cabeceras equivocadas, volviendo tus CSP inútiles. Asegúrate de no usar una CDN cuando uses este módulo, o recuerda asignar la opción `browserSniff` en `false`.