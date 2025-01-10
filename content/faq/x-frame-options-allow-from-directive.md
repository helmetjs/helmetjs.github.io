---
title: How do I use X–Frame–Options's "ALLOW–FROM" directive?
---

The `X-Frame-Options` header has a directive, `ALLOW-FROM`, which is obsolete. It has [limited browser support](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options#Browser_compatibility) and is improved by the [`frame-ancestors` Content Security Policy directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors). To quote MDN: "don't use it."

If you _need_ to set this directive value for some reason, you can create your own small middleware function. Here's what that might look like:

```js
// NOTE: `ALLOW-FROM` is not supported in most browsers.
app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "ALLOW-FROM https://example.com");
  next();
});
```
