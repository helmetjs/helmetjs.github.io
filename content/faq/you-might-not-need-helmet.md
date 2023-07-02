---
title: "You might not need Helmet"
---

Helmet is designed to be easy to use and integrate, but if you want to avoid a dependency and get a slight performance boost, here's how.

By default, Helmet adds 12 HTTP response headers and removes one.

To add Helmet's default response headers, define an object that contains the headers you want to set, then add them in a single middleware. For example:

```js
const HEADERS = {
  "Content-Security-Policy":
    "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Origin-Agent-Cluster": "?1",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-DNS-Prefetch-Control": "off",
  "X-Download-Options": "noopen",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Permitted-Cross-Domain-Policies": "none",
  "X-XSS-Protection": "0",
};

app.use((req, res, next) => {
  res.set(HEADERS);
  next();
});
```

Feel free to tweak this object as you wish. It doesn't just have to be for Helmet-related headers; if there's a header you always want to set, you can do so here.

Express sets the `X-Powered-By` header [by default](https://expressjs.com/en/4x/api.html#app.settings.table), which Helmet removes. You can override this Express default like this:

```js
app.disable("x-powered-by");
```

(This should be done at the top level; no need to do this inside of middleware or anything.)

In my testing, this was about 5%–10% faster than using Helmet, but your performance may vary.

You may still wish to use Helmet as it tries to make things easy to use, but now you can see that you don't have to!
