---
layout: page
title: Docs
permalink: /docs/
---
Helmet is a collection of 14 middleware functions to help set some HTTP response headers.

First, run `npm install helmet --save` for your app. Then, in an Express (or Connect) app:

```js
const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())

// ...
```

It's best to `use` Helmet early in your middleware stack so that its headers are sure to be set.

You can also use its pieces individually:

```js
app.use(helmet.noCache())
app.use(helmet.frameguard())
```

You can disable a middleware that's normally enabled by default. This will disable `frameguard` but include the other defaults.

```js
app.use(helmet({
  frameguard: false
}))
```

You can also set options for a middleware. Setting options like this will *always* include the middleware, whether or not it's a default.

```js
app.use(helmet({
  frameguard: {
    action: 'deny'
  }
}))
```

*If you're using Express 3, make sure these middlewares are listed before `app.router`.*

Visit each module's page to learn more.

| Module | Included by default? |
|---|---|
| [contentSecurityPolicy](csp) for setting Content Security Policy |  |
| [crossdomain](crossdomain) for handling Adobe products' crossdomain requests |  |
| [dnsPrefetchControl](dns-prefetch-control) controls browser DNS prefetching | ✓ |
| [expectCt](expect-ct) for handling Certificate Transparency |  |
| [featurePolicy](feature-policy) to limit your site's features | |
| [frameguard](frameguard) to prevent clickjacking | ✓ |
| [hidePoweredBy](hide-powered-by) to remove the X-Powered-By header | ✓ |
| [hpkp](hpkp) for HTTP Public Key Pinning |  |
| [hsts](hsts) for HTTP Strict Transport Security | ✓ |
| [ieNoOpen](ienoopen) sets X-Download-Options for IE8+ | ✓ |
| [noCache](nocache) to disable client-side caching |  |
| [noSniff](dont-sniff-mimetype) to keep clients from sniffing the MIME type | ✓ |
| [referrerPolicy](referrer-policy) to hide the Referer header |  |
| [xssFilter](xss-filter) adds some small XSS protections | ✓ |
