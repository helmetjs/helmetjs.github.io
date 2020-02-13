---
layout: page
title: Expect-CT
permalink: /translations/es/expect-ct/
---
La cabecera HTTP `Expect-CT` indica a los navegadores que deben esperar ("*Certificate Transparency*"). Para saber más acerca de *Certificate Transparency y ésta cabecera, ve [este artículo](https://scotthelme.co.uk/a-new-security-header-expect-ct/) y esta [especificación](https://datatracker.ietf.org/doc/draft-stark-expect-ct).

Implementación:

```javascript
const expectCt = require('expect-ct')

// Asigna Expect-CT: max-age=123
app.use(expectCt({ maxAge: 123 }))

// Asigna Expect-CT: enforce; max-age=123
app.use(expectCt({
  enforce: true,
  maxAge: 123
}))

// Asigna Expect-CT: enforce; max-age=30; report-uri="http://example.com/report"
app.use(expectCt({
  enforce: true,
  maxAge: 30,
  reportUri: 'http://example.com/report'
}))
```
