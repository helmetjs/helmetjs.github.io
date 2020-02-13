---
layout: page
permalink: /
---
Helmet helps you secure your Express apps by setting various HTTP headers. *It's not a silver bullet*, but it can help!

Quick start
===========

First, run `npm install helmet --save` for your app. Then, in an Express app:

```javascript
const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())

// ...
```

That's it! Helmet will set various HTTP headers to help protect your app.

How it works
============

Helmet is a collection of 13 smaller middleware functions that set HTTP response headers. Running `app.use(helmet())` will not include all of these middleware functions by default.

You can see more in [the documentation](/translations/es).

| Module | Default? |
|---|---|
| [contentSecurityPolicy](/translations/es/csp/) for setting Content Security Policy |  |
| [dnsPrefetchControl](/translations/es/dns-prefetch-control) controls browser DNS prefetching | ✓ |
| [expectCt](/translations/es/expect-ct/) for handling Certificate Transparency |  |
| [featurePolicy](/translations/es/feature-policy/) to limit your site's features |  |
| [frameguard](/translations/es/frameguard/) to prevent clickjacking | ✓ |
| [hidePoweredBy](/translations/es/hide-powered-by) to remove the X-Powered-By header | ✓ |
| [hsts](/translations/es/hsts/) for HTTP Strict Transport Security | ✓ |
| [ieNoOpen](/translations/es/ienoopen) sets X-Download-Options for IE8+ | ✓ |
| [noCache](/translations/es/nocache/) to disable client-side caching |  |
| [noSniff](/translations/es/dont-sniff-mimetype) to keep clients from sniffing the MIME type | ✓ |
| [permittedCrossDomainPolicies](/translations/es/crossdomain/) for handling Adobe products' crossdomain requests |  |
| [referrerPolicy](/translations/es/referrer-policy) to hide the Referer header |  |
| [xssFilter](/translations/es/xss-filter) adds some small XSS protections | ✓ |
