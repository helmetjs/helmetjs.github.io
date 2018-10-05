---
layout: page
title: DNS Prefetch Control
permalink: /docs/dns-prefetch-control/
---
In short: this middleware lets you disable browsers' DNS prefetching by setting the `X-DNS-Prefetch-Control` header.

The attack
----------

When you visit a URL, your browser has to look up the domain's IP address. For example, it has to resolve `example.com` to `93.184.216.34`. This process is called DNS.

Browsers can start these DNS requests before the user even clicks a link or loads a resource from somewhere. This improves performance when the user clicks the link, but has privacy implications for users. It can appear as if a user is visiting things they aren't visiting.

Read more:

- ["Controlling DNS prefetching" on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Controlling_DNS_prefetching)
- ["DNS Prefetching" on Chromium docs](https://dev.chromium.org/developers/design-documents/dns-prefetching)
- ["Prefetching"](https://www.keycdn.com/support/prefetching/)

The header
----------

The `X-DNS-Prefetch-Control` header tells browsers whether they should do DNS prefetching. Turning it on may not work—not all browsers support it in all situations—but turning it off should disable it on all supported browsers.

To disable DNS prefetching, set the `X-DNS-Prefetch-Control` header to `off`. To attempt to enable it, set the value to `on`.

Most browsers don't do DNS prefetching so most browsers can ignore this header.

Read more:

- ["Controlling DNS prefetching" on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Controlling_DNS_prefetching)
- ["DNS Prefetching" on Chromium docs](https://dev.chromium.org/developers/design-documents/dns-prefetching)

The code
--------

Helmet's DNS Prefetch Control is a relatively simple middleware that will set the `X-DNS-Prefetch-Control` header.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
const helmet = require('helmet')

// Sets "X-DNS-Prefetch-Control: off".
app.use(helmet.dnsPrefetchControl())
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install dns-prefetch-control" to get the dns-prefetch-control package.
const dnsPrefetchControl = require('dns-prefetch-control')

// Sets "X-DNS-Prefetch-Control: off".
app.use(dnsPrefetchControl())
```

Once you've required it, you can use it in your apps:

```javascript
// Sets "X-DNS-Prefetch-Control: off".
app.use(dnsPrefetchControl())

// Sets "X-DNS-Prefetch-Control: off".
app.use(dnsPrefetchControl({ allow: false }))

// Sets "X-DNS-Prefetch-Control: on".
app.use(dnsPrefetchControl({ allow: true }))
```

This header is included in the default Helmet bundle.
