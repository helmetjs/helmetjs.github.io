---
layout: page
title: Referrer Policy
permalink: /docs/referrer-policy/
---
In short: the Referrer Policy module can control the behavior of the `Referer` header by setting the `Referrer-Policy` header.

The attack
----------

The [`Referer` HTTP header](https://en.wikipedia.org/wiki/HTTP_referer) is typically set by web browsers to tell a server where it's coming from. For example, if you click a link on `example.com/index.html` that takes you to `wikipedia.org`, Wikipedia's servers will see `Referer: example.com`.

This can have privacy implications—websites can see where users are coming from.

Read more:

- [Referer header specification](https://tools.ietf.org/html/rfc7231#section-5.5.2)
- ["HTTP referer" on Wikipedia](https://en.wikipedia.org/wiki/HTTP_referer)

The header
----------

The new [`Referrer-Policy` HTTP header](https://www.w3.org/TR/referrer-policy/#referrer-policy-header) lets authors control how browsers set the `Referer` header.

For example, when supported browsers see this header, they will set no `Referer` header at all:

```
Referrer-Policy: no-referrer
```

There are other directives, too. `same-origin`, for example, will only send the `Referer` header for pages on the same origin.

```
Referrer-Policy: same-origin
```

You can see the full list of directives on [the specification](https://www.w3.org/TR/referrer-policy/#referrer-policies).

Browser support for this header is mixed.

Read more:

- [Referrer-Policy specification](https://www.w3.org/TR/referrer-policy/#referrer-policy-header)
- [Can I Use Referrer Policy](http://caniuse.com/#feat=referrer-policy)

The code
--------

Helmet's Referrer Policy module is a relatively simple middleware that will set the `Referrer-Policy` header.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
const helmet = require('helmet')

// Sets "Referrer-Policy: same-origin".
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install referrer-policy" to get the referrer-policy package.
const referrerPolicy = require('referrer-policy')

// Sets "Referrer-Policy: no-referrer".
app.use(referrerPolicy({ policy: 'no-referrer' }))
```

Once you've required it, you can use it in your apps:

```javascript
// Sets "Referrer-Policy: same-origin".
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

// Sets "Referrer-Policy: unsafe-url".
app.use(helmet.referrerPolicy({ policy: 'unsafe-url' }))

// Sets "Referrer-Policy: no-referrer".
app.use(helmet.referrerPolicy())
```

This header is not included in the default Helmet bundle.
