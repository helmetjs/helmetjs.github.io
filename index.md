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

Helmet is really just a collection of 10 smaller pieces of middleware that set HTTP headers.

* contentSecurityPolicy for setting Content Security Policy
* dnsPrefetchControl controls browser DNS prefetching
* frameguard to prevent clickjacking
* hidePoweredBy to remove the X-Powered-By header
* hpkp for HTTP Public Key Pinning
* hsts for HTTP Strict Transport Security
* ieNoOpen sets X-Download-Options for IE8+
* noCache to disable client-side caching
* noSniff to keep clients from sniffing the MIME type
* xssFilter adds some small XSS protections

`app.use(helmet())` will include 7 of the 10, leaving out `contentSecurityPolicy`, `hpkp`, and `noCache`. You can also use each module individually, like this:

```javascript
app.use(helmet.noCache())
app.use(helmet.frameguard())
```
