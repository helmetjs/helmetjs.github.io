---
title: How do I enable the "report" directive with the X-XSS-Protection header?
---

Previous versions of Helmet (and the `x-xss-protection` package) allowed you to add the `report` directive. This functionality was removed because enabling this header is no longer recommended.

If you still need to set a `report` directive for some reason, you can write your own small middleware:

```js
// NOTE: This is discouraged.
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block; report=/report-path");
  next();
});
```
