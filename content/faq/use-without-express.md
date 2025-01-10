---
title: "How to use Helmet without Express"
---

Helmet is [Connect-style](https://www.npmjs.com/package/connect) middleware, which means it's compatible with web frameworks like Express and Connect.

People have ported Helmet to other frameworks like [Koa](https://github.com/venables/koa-helmet) and [Fastify](https://github.com/fastify/fastify-helmet).

If you're not using Helmet with Express, you can pass an `http.IncomingMessage`, `http.ServerResponse`, and a callback function. For example, here's how to use Helmet with Node's built-in HTTP module:

```javascript
const http = require("http");
const helmet = require("helmet");

const runHelmet = helmet();

const server = http.createServer((req, res) => {
  runHelmet(req, res, (err) => {
    if (err) {
      res.statusCode = 500;
      res.end(
        "Helmet failed for some unexpected reason. Was it configured correctly?",
      );
      return;
    }

    res.end("Hello world!");
  });
});

server.listen(3000);
```
