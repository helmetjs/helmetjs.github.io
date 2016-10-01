---
layout: page
title: HTTP Public Key Pinning
permalink: /docs/hpkp/
---
In short: the HTTP Public Key Pinning module helps you set the `Public-Key-Pins` header to prevent person-in-the-middle attacks.

The attack
----------

*This assumes you know how HTTPS works; you should have an understanding of certificate authorities and public keys. If you're not there yet, read ["How does SSL/TLS work?" on Information Security Stack Exchange](https://security.stackexchange.com/questions/20803/how-does-ssl-tls-work).*

One of the main things HTTPS offers is proof of identity. If everything is working well, you'll know that you're talking to `example.com` and not some other site. This is done by checking `example.com`'s public keys against a certificate authority.

Unfortunately, CAs can be compromised. This means that they can issue bogus certificates, which means that they could trick browsers—maybe `example.com` isn't authentic after all!

If an attacker can trick your browser into thinking that an HTTPS site is legitimate, they can do all kinds of things. They can log into any account they can impersonate, for example. This means that they could read all of your email or steal all of your money!

The header
----------

One way to mitigate this problem is to pin your site's public keys.

The first time a user visits your site, they can see that you have some public keys pinned. They'll store these away. Then, on every subsequent visit, the user will make sure the public keys match the ones they stored. If they don't match, that could mean that a CA was compromised.

You can pin headers with the `Public-Key-Pins` header. Here's an example header [from MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning) that pins two public keys for 60 days:

```
Public-Key-Pins: pin-sha256="cUPcTAZWKaASuYWhhneDttWpY3oBAkE3h2+soZS7sWs="; pin-sha256="M8HztCzM3elUxkcjR2S5P4hhyBNf6lHkmjAHKhpGPWE="; max-age=5184000
```

Your browser will store those for 60 days. If the public keys are ever mismatched with those SHA-256 hashes, your browser will assume things aren't correct.

Read more:

- [Specification](https://timtaubert.de/blog/2014/10/http-public-key-pinning-explained/)
- ["Public Key Pinning" on MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning)
- ["HTTP Public-Key-Pinning explained"](https://timtaubert.de/blog/2014/10/http-public-key-pinning-explained/)

The code
--------

Helmet's HPKP module will set the `Public-Key-Pins` header.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
var helmet = require('helmet')

var ninetyDaysInSeconds = 7776000
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}))
```

This header is not included in the default Helmet bundle.

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install hpkp" to get the hpkp package.
var hpkp = require('hpkp')

var ninetyDaysInSeconds = 7776000
app.use(hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: ['AbCdEf123=', 'ZyXwVu456=']
}))
```

### Including subdomains

You can append the `includeSubDomains` directive with an option of the same name.

```javascript
// Sets "Public-Key-Pins: ...; includeSubDomains"
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: [/* ... */],
  includeSubdomains: true
}))
```

### Reporting

You can specify a `report-uri` to which browsers will report violations.

```javascript
// Sets `Public-Key-Pins: ...; report-uri="https://example.com/hpkp-report"`
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: [/* ... */],
  reportUri: 'https://example.com/hpkp-report'
}))
```

You can also switch to report-only mode, which sets the `Public-Key-Pins-Report-Only` header.

```javascript
// Sets the Public-Key-Pins-Report-Only header.
app.use(helmet.hpkp({
  maxAge: ninetyDaysInSeconds,
  sha256s: [/* ... */],
  reportUri: 'https://example.com/hpkp-report',
  reportOnly: true
}))
```

### Setting the header conditionally

You can choose to set the header conditionally with the `setIf` option. This is a function that will be passed the request and response objects. It should return `true` if the header should be set and `false` otherwise.

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
