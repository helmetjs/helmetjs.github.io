---
layout: page
title: Feature-Policy
permalink: /translations/es/feature-policy/
---
Brevemente: la función middleware `featurePolicy` de Helmet te permite restringir qué prestaciones o funciones del navegador pueden ser usadas. Por ejemplo, puedes desabilitar las APIs 'fullscreen' o 'vibration'.

El "ataque"
------------

Siempre es una buena idea limitar el área de superficie de tu código. Menos cosas implica menos posibilidades de un ataque.

Los navegadores poseen muchas prestaciones y funcionalidades diferentes, desde vibraciones y accesos a la pantalla completa hasta el uso del micrófono incorporado y la cámara. Mientras algunas de estas funcionalidades pueden ser bastánte útiles, es improbable que desees tener todas habilitadas al mismo tiempo, y mucho menos que *scripts* de tercero puedan usarlas.

La cabecera
----------

La cabecera `Feature-Policy` le indica al navegador qué funcionalidades puede usar. Por ejemplo, si deseas desabilitar las notificaciones para todos los usuarios al tiempo que quieres aceptar pagos de `ejemplo.com`, puedes enviar una cabecera como la siguiente:

```
Feature-Policy: notifications 'none'; payments example.com
```

Leer más:

- ["A new security header: Feature-Policy"](https://scotthelme.co.uk/a-new-security-header-feature-policy/)
- [Feature Policy](https://developers.google.com/web/updates/2018/06/feature-policy)

El código
--------

La función middleware `featurePolicy` de Helmet ayuda a asignar estas cabeceras.

Puedes utilizar éste módulo como parte de Helmet:

```javascript
// Asegúrate de haber ejecutado "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    payment: ['example.com'],
    syncXhr: ["'none'"]
  }
}))
```

También puedes usar éste módulo en solitario:

```javascript
// Asegúrate de haber ejecutado "npm install feature-policy" para obtener éste paquete.
const featurePolicy = require('feature-policy')

app.use(featurePolicy({
  features: {
    vibrate: ["'self'"],
    syncXhr: ["'none'"]
  }
}))
```

Las siguientes funcionalidades están soportadas:

* `accelerometer`
* `ambientLightSensor`
* `autoplay`
* `camera`
* `documentDomain`
* `documentWrite`
* `encryptedMedia`
* `fontDisplayLateSwap`
* `fullscreen`
* `geolocation`
* `gyroscope`
* `layoutAnimations`
* `legacyImageFormats`
* `loadingFrameDefaultEager`
* `magnetometer`
* `microphone`
* `midi`
* `oversizedImages`
* `payment`
* `pictureInPicture`
* `serial`
* `speaker`
* `syncScript`
* `syncXhr`
* `unoptimizedImages`
* `unoptimizedLosslessImages`
* `unoptimizedLossyImages`
* `unsizedMedia`
* `usb`
* `verticalScroll`
* `vibrate`
* `vr`
* `wakeLock`
* `xr`
