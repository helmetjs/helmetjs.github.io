---
title: "How should I use Helmet with non-document responses?"
---

Helmet is designed to be easy to use. It sets its security headers for all responses.

Unfortunately, this can lead to unnecessarily headers being set for some responses, hampering performance slightly. For example, you don't need to set the `Content-Security-Policy` header when responding with a PNG image, but you probably _do_ want to set the `Strict-Transport-Security` header.

Here is a list of Helmet headers that are _usually safe to omit unless you're responding with HTML_:

- `Content-Security-Policy`
- `Cross-Origin-Embedder-Policy`
- `Cross-Origin-Opener-Policy`
- `Origin-Agent-Cluster`
- `Referrer-Policy`
- `X-DNS-Prefetch-Control`
- `X-XSS-Protection`

This all depends on your application, though. **If you're not sure, keep the header.**

There are a wide variety of options to address this issue and they are heavily dependent on your application, so it's hard to give a code snippet. But here's a very naïve one:

```javascript
const helmetForDocuments = helmet();
const helmetForNonDocuments = helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  originAgentCluster: false,
  referrerPolicy: false,
  xDnsPrefetchControl: false,
  xXssProtection: false,
});

// ...

app.get(
  "/my/route",
  (req, res, next) => {
    if (shouldRespondWithDocument(req)) {
      helmetForDocuments(req, res, next);
    } else {
      helmetForNonDocuments(req, res, next);
    }
  },
  (req, res) => {
    // ...
  },
);
```
