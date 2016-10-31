---
layout: page
title: No Cache
permalink: /docs/nocache/
---
In short: the `nocache` middleware aims to disable browser caching by setting several headers.

The "attack"
------------

This module doesn't exactly protect a specific attack. It prevents users from getting cached versions of your files (like old JavaScript).

For example, imagine you have a front-end web app that serves JavaScript. One day, you discover that one of your JavaScript libraries has a vulnerability, so you upgrade it and update your site. Unfortunately, there are some cases where users can get *old*, cached versions of your code, which might still have the vulnerability.

Caching has lots of benefits, but it can cause users to get stale versions.

The headers
-----------

This module deals with four caching headers.

1. `Cache-Control` is a header that has many directives. For example, `Cache-Control: max-age=864000` will tell browsers to cache the response for 10 days. In those 10 days, browsers will pull from their caches. Setting this header to `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate` will obliterate caching, as far as this header is concerned.
2. `Surrogate-Control` is another header that CDNs respect. You can use it to tell intermediate caches to eschew caching.
3. `Pragma` is a legacy HTTP header. Setting `Pragma: no-cache` will tell supported browsers to stop caching the response. It has fewer features than `Cache-Control` but it can better support old browsers.
4. `Expires` specifies when the content should be considered out of date, or expired. Setting this to `0` will tell browsers the content expires immediately. In other words, they shouldn't cache it.

Absent from this list is the [ETag header](https://en.wikipedia.org/wiki/HTTP_ETag), which is a pretty safe caching mechanism.

Read more:

* [Cache-Control RFC](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)
* [Pragma RFC](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.32)
* ["Cache control tutorial" on Fastly's documentation](https://docs.fastly.com/guides/tutorials/cache-control-tutorial)
* ["HTTP Caching" on Google Developers](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)

The code
--------

Helmet's `noCache` is a relatively simple middleware that will set the four HTTP headers noted above: `Cache-Control`, `Surrogate-Control`, `Pragma`, and `Expires`.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
var helmet = require('helmet')

app.use(helmet.noCache())
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install nocache" to get the nocache package.
var noCache = require('nocache')

app.use(noCache())
```

This header is *not* included in the default Helmet bundle.
