---
layout: page
title: Don't Sniff Mimetype
permalink: /middleware/dont-sniff-mimetype/
---

In short: `noSniff` helps prevent browsers from trying to guess ("sniff") the MIME type, which can have security implications. It does this by setting the `X-Content-Type-Options` header to `nosniff`.

The attack
----------

TODO

The header
----------

The `X-Content-Type-Options` header tells browsers not to sniff mimetypes when it is set to its only possible value, `nosniff`. When this header is set, browsers won't sniff the MIME type—they will trust what the server says.

The main disadvantage of this header is performance—it takes some time to send the extra bytes for this header. It helps to prevent unpredictable browser behavior, which can be an attack vector.

Read more:

- [Specification](TODO)
- [MDN]() TODO
- Caniuse? TODO

The code
--------

The `noSniff` middleware will set the `X-Content-Type-Options` header to `nosniff` for every request.

You can use this module as part of Helmet:

```javascript
var helmet = require('helmet')

// Sets "X-Content-Type-Options: nosniff".
app.use(helmet.noSniff())
```

You can also use it as a standalone module:

```javascript
var noSniff = require('dont-sniff-mimetype')

// Sets "X-Content-Type-Options: nosniff".
app.use(noSniff())
```

This header is included in the default Helmet bundle and it uses its default value, `SAMEORIGIN`.
