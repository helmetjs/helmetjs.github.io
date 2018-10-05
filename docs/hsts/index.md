---
layout: page
title: HSTS
permalink: /docs/hsts/
---
In short: this module sets the `Strict-Transport-Security` header to keep your users on HTTPS.

The attack
----------

HTTPS, while not always perfect, is a secure protocol. HTTP, by contrast, is horrible. "Vanilla" HTTP users are vulnerable to person-in-the-middle attacks and nothing sent is encrypted. I like to think of insecure HTTP as "anything goes".

If I want to hack you, I would much prefer you to be on HTTP over HTTPS.

Read more:

- ["HTTPS" on Wikipedia](https://en.wikipedia.org/wiki/HTTPS)
- ["Web Security: Why You Should Always Use HTTPS" on Mashable](http://mashable.com/2011/05/31/https-web-security/)

The header
----------

The `Strict-Transport-Security` HTTP header tells browsers to stick with HTTPS and never visit the insecure HTTP version. Once a browser sees this header, it will only visit the site over HTTPS for the next 60 days:

```
Strict-Transport-Security: max-age=5184000
```

Note that the header won't tell users on HTTP to *switch* to HTTPS, it will just tell HTTPS users to stick around. You can enforce HTTPS with the [express-enforces-ssl](https://github.com/aredo/express-enforces-ssl) module.

Read more:

- [Specification](https://tools.ietf.org/html/rfc6797)
- ["HTTP Strict Transport Security" on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/HTTP_strict_transport_security)
- ["HTTP Strict Transport Security Cheat Sheet" on OWASP](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)
- ["HTTP Strict Transport Security" on Wikpedia](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)

The code
--------

Helmet's HSTS is a relatively simple middleware that will set the `Strict-Transport-Security` header.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
const helmet = require('helmet')

// Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
const sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}))
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install hsts" to get the hsts package.
const hsts = require('hsts')

// Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
const sixtyDaysInSeconds = 5184000
app.use(hsts({
  maxAge: sixtyDaysInSeconds
}))
```

### Including subdomains

The `includeSubDomains` directive is included by default. To opt out, set the `includeSubDomains` option to `false`.

```javascript
// Sets "Strict-Transport-Security: max-age=5184000".
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds,
  includeSubDomains: false
}))
```

### Setting the header conditionally

This header will always be set because [the header is ignored in insecure HTTP](https://tools.ietf.org/html/rfc6797#section-8.1). If you wish to set it conditionally, use `setIf`, a function that should return `true` if the header should be set and `false` otherwise.

```javascript
app.use(helmet.hsts({
  // ...
  setIf: (req, res) => req.secure
}))
```

### Preloading HSTS in Chrome

Some browsers let you submit your site's HSTS to be baked into the browser. You can add `preload` to the header with the following code. You can check your eligibility and submit your site at [hstspreload.org](https://hstspreload.org/).

```javascript
app.use(hsts({
  // Must be at least 1 year to be approved
  maxAge: 31536000,

  // Must be enabled to be approved
  includeSubDomains: true,
  preload: true
}))
```
