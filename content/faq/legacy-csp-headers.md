---
title: How do I set legacy Content Security Policy headers?
---

In Helmet v3 and `helmet-csp` v2, there is a `setAllHeaders` option. This sets the modern `Content-Security-Policy` header and the legacy `X-WebKit-CSP` and `X-Content-Security-Policy` headers.

In Helmet 4+, this option was removed. To achieve the same effect, add this middleware after you use Helmet:

```js
// Make sure to use this AFTER you use Helmet's middleware.
app.use((req, res, next) => {
  const csp = res.getHeader("Content-Security-Policy");
  res.setHeader("X-WebKit-CSP", csp);
  res.setHeader("X-Content-Security-Policy", csp);
  next();
});
```

You can customize it as needed. For example, you could remove support for the `X-WebKit-CSP` header.

If you are using `Content-Security-Policy-Report-Only`, you can do something very similar:

```js
app.use((req, res, next) => {
  const csp = res.getHeader("Content-Security-Policy-Report-Only");
  res.setHeader("X-WebKit-CSP-Report-Only", csp);
  res.setHeader("X-Content-Security-Policy-Report-Only", csp);
  next();
});
```
