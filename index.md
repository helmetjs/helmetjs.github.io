---
layout: page
permalink: /
---
Helmet helps you secure your Express apps by setting various HTTP headers. *It's not a silver bullet*, but it can help!

Quick start
===========

First, run `npm install helmet --save` for your app. Then, in an Express app:

```javascript
var express = require('express')
var helmet = require('helmet')

var app = express()

app.use(helmet())

// ...
```

That's it! Helmet will set various HTTP headers to help protect your app.

How it works
============

Helmet is a collection of 11 smaller middleware functions that set HTTP headers. Running `app.use(helmet())` will not include all of these middleware functions by default.

You can see more in [the documentation](/docs).

| Module | Default? |
|---|---|
| [contentSecurityPolicy](/docs/csp/) for setting Content Security Policy |  |
| [dnsPrefetchControl](/docs/dns-prefetch-control) controls browser DNS prefetching | ✓ |
| [frameguard](/docs/frameguard/) to prevent clickjacking | ✓ |
| [hidePoweredBy](/docs/hide-powered-by) to remove the X-Powered-By header | ✓ |
| [hpkp](/docs/hpkp/) for HTTP Public Key Pinning |  |
| [hsts](/docs/hsts/) for HTTP Strict Transport Security | ✓ |
| [ieNoOpen](/docs/ienoopen) sets X-Download-Options for IE8+ | ✓ |
| [noCache](/docs/nocache/) to disable client-side caching |  |
| [noSniff](/docs/dont-sniff-mimetype) to keep clients from sniffing the MIME type | ✓ |
| [referrerPolicy](/docs/referrer-policy) to hide the Referer header |  |
| [xssFilter](/docs/xss-filter) adds some small XSS protections | ✓ |
