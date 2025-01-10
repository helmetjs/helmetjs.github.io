---
title: How do I disable blocking with the X-XSS-Protection header?
---

Previous versions of Helmet (and the `x-xss-protection` npm package) allowed you to remove the `mode=block` directive. This functionality was removed because it is not recommended.

If you still need to do that, you can write your own small middleware:

```js
// NOTE: This is discouraged.
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1");
  next();
});
```
