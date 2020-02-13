---
layout: page
title: HTTP Public Key Pinning
permalink: /translations/es/hpkp/
---
<div class="callout">
  <strong>Este middleware está considerado obsoleto.</strong> Y será removido desde Helmet 4. De todas, aunque no habrá nuevas funcionalidades añadidas al módulo  <code>hpkp</code> puedes continuar leyendo ésta documentación.
</div>

Brevemente: el módulo HTTP *Public Key Pinning** ayuda a setear la cabecera `Public-Key-Pins` para prevenir ataques del tipo hombre-en-el-medio (*"men-in-the-middle*"). **El uso de esta cabecera (y, por añadidura, de éste middleware) no es recomendado.**

**Sé cauteloso cuando al utilizar esto**—Es muy fácil hacer un uso inadecuado y esto puede traerte serios problemas. [Chrome ha dejado de dar soporte a HPKP citando los riesgos de su uso.](https://www.chromestatus.com/feature/5903385005916160)

El ataque
----------

*Esto asume que sabes cómo funciona el protocolo HTTPS; lo que implica que deberías tener conocimiento acerca de las las autoridades que proveen de certificados y de las claves públicas. Si todavía no tienes conocimiento al respecto, te recomendamos la siguiende lectura: ["How does SSL/TLS work?" on Information Security Stack Exchange](https://security.stackexchange.com/questions/20803/how-does-ssl-tls-work).*

Una de las principales prestaciones que el protocolo HTTPS ofrece tiene que ver con la verificación de identidad. Si todo funciona bien, sabrás que estás entablando una conección con `example.com` y no con otro sitio. Esto es realizado mediante la verificación de las claves publicas provistas por `example.com` contra la autoridad que las certifica.

Desafortunadamente, las autoridades certificantes pueden estar comprometidas. Esto significa que pueden entregar certificados dudosos, lo que a su vez significa que podrían engañar a algunos navegadores --quizás `example.com` no es tan confiable como parecía ser!

Si un atacante logra engañar a tu navegador y hacerle creer que la conección HTTPS con un sitio eslegitima, puede hacer una gran cantidad de cosas... Podrían hacerse pasar por otros sitios en los que sí confías y robar información sensible como e-mails, passwords o incluso dinero.

La cabecera
----------

Una de las maneras de mitigar este problema es ostentar las claves públicas de tu sitio.

Así cualquier usuario podrá ver que tienes tus claves públicas a disposición desde el primer contacto con tu sitio, las cuales serán guardadas de inmediato. Luego, en cualquier otra visita subsecuente, el usuario se asegurará que tus claves públicas coincidan con las que ha guardado anteriormente. Si no lo hacen, eso podría significar que la autoridad que las ha emitido está comprometida.

Para realizar esto puedes usar las cabeceras `Public-Key-Pins`. He aquí un ejemplo [de MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning) en el que la cabecera es usada para ostentar dos claves públicas por un periodo de 60 días:

```
Public-Key-Pins: pin-sha256="cUPcTAZWKaASuYWhhneDttWpY3oBAkE3h2+soZS7sWs="; pin-sha256="M8HztCzM3elUxkcjR2S5P4hhyBNf6lHkmjAHKhpGPWE="; max-age=5184000
```
El navegador guardará esas claves por 60 días. Si aquellas claves no coinciden con aquellos hashes provistos por el protocolo SHA-256, el navegador asumirá que no son correctas.

Observa que Chrome ha dejado de dar soporte para esta cabecera; de ser usada, simplemente será ignorada.

Para más información:

- [Specification](https://timtaubert.de/blog/2014/10/http-public-key-pinning-explained/)
- ["Public Key Pinning" on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning)
- ["HTTP Public-Key-Pinning explained"](https://timtaubert.de/blog/2014/10/http-public-key-pinning-explained/)

El código
--------

El módulo HPKP wteará la cabecera `Public-Key-Pins`.

<div class="callout">
  <strong>Este middleware está considerado obsoleto.</strong> Será removido desde Helmet 4.
</div>

**Advertencia: se cuidadoso a la hora de usar esto**—es fácil hacer un uso incorrecto, lo que podría causar problemas. Chrome ha dejado de dar soporte para ésta funcionalidad.

Puedes usar éste módulo como parte del paquete de Helmet:

```javascript
// Asegurate de haber ejecutado "npm install helmet" para obtener el paquete de Helmet.
const helmet = require('helmet')

const ninetyDaysInSeconds = 7776000
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}))
```

Esta cabecera no está incorporada por defecto en el paquete de Helmet.

También puedes usar éste módulo en solitario:

```javascript
// Asegurate de haber ejecutado "npm install hpkp" para obtener éste paquete.
const hpkp = require('hpkp')

const ninetyDaysInSeconds = 7776000
app.use(hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}))
```
No dejes que éstos se de-sincronicen con tus certificados! También es recomendable que pruebes tu uso de HPKP en el modo `reportOnly`, o de manera alternativa, usando una `maxAge` muy corta, hasta que tengas la certeza de que tu *deployment* es correcto.

### Incluyendo subdominios

Puedes añadir la direciva `includeSubDomains` con una opción del mismo nombre.

```javascript
// Asigna "Public-Key-Pins: ...; includeSubDomains"
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: [/* ... */],
  includeSubdomains: true
}))
```

### Reportando

Puedes especificar una `report-uri` hacia la cual los navegadores pueden reportar posibles violaciones.

```javascript
// Setea `Public-Key-Pins: ...; report-uri="https://example.com/hpkp-report"`
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: [/* ... */],
  reportUri: 'https://example.com/hpkp-report'
}))
```

Así mismo, también puedes cambiar al modo *solo-reportar*, el cual setea la siguiente cabecera `Public-Key-Pins-Report-Only` .

```javascript
// Setea the Public-Key-Pins-Report-Only header.
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: [/* ... */],
  reportUri: 'https://example.com/hpkp-report',
  reportOnly: true // sólo-reportar 
}))
```

### Asignando la cabecera de manera basándose en condiciones

Puedes elegir asignar la cabecera de manera condicinal con la opción `setIf`. Ésta es una función que será pasada a los objetos *request* y *response*. Debería retornar `true` si la cabecera debe ser usada, y `false` en caso contrario.

```javascript
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: [/* ... */],
  setIf: function (req, res) {
    if (req.secure) {
      return true
    } else {
      return false
    }
  }
}))
```
