---
title: How do I set a custom X-Powered-By header?
---

In Express, the `X-Powered-By` header is set to `Express` by default. Removing it has limited security benefits, as does setting it to another value. The latter was removed in a breaking Helmet change.

If you want to replicate this behavior for some reason, you can do it with a few lines of Express:

```js
// NOTE: This offers limited security benefits.
app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "Foo Bar");
  next();
});
```
