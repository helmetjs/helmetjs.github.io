---
title: "Conditionally setting header options"
---

To change a header conditionally, create your own small middleware function that conditionally calls different invocations of Helmet.

For example, you could decide to conditionally change the Referrer Policy for a subset of users. Here's how that could look:

```javascript
const helmetWithNoReferrer = helmet({
  referrerPolicy: { policy: "no-referrer" },
});
const helmetWithSameOrigin = helmet({
  referrerPolicy: { policy: "same-origin" },
});

app.use((req, res, next) => {
  if (req.user.useSameOrigin) {
    helmetWithSameOrigin(req, res, next);
  } else {
    helmetWithNoReferrer(req, res, next);
  }
});
```

As a special case, the `Content-Security-Policy` header can be set conditionally. For example, here's how to use a CSP nonce:

```javascript
app.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
      },
    },
  }),
);
```
