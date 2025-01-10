---
title: "See also"
aliases:
- /see-also
---

Helmet only deals with HTTP headers, but there are a number of other helpful security modules for Express. As a disclaimer, Helmet's maintainers have not heavily audited these modules!

- [cors](https://www.npmjs.org/package/cors)
- [express-content-length-validator](https://github.com/ericmdantas/express-content-length-validator)
- [express-enforces-ssl](https://github.com/aredo/express-enforces-ssl)
- [hpp](https://www.npmjs.com/package/hpp)
- [host-validation](https://www.npmjs.com/package/host-validation)

This module also exists in other environments. Some are direct ports where others are similar modules.

- ASP.NET: [NWebsec](https://docs.nwebsec.com/en/latest/index.html)
- Crystal: [crystal-helmet](https://github.com/EvanHahn/crystal-helmet)
- Dart: [shelf_helmet](https://github.com/jxstxn1/shelf_helmet)
- Django (Python framework): [django-csp](https://django-csp.readthedocs.io/en/latest/)
- Dropwizard (Java framework): [dropwizard-web-security](https://github.com/palantir/dropwizard-web-security)
- Elixir: [SecureHeaders](https://github.com/anotherhale/secure_headers)
- Ember.js (JavaScript framework): [ember-cli-content-security-policy](https://github.com/rwjblue/ember-cli-content-security-policy/)
- Fastify (Node framework): [fastify-helmet](https://github.com/fastify/fastify-helmet)
- Flask (Python framework): [Talisman](https://github.com/GoogleCloudPlatform/flask-talisman)
- Go: [secure](https://github.com/unrolled/secure); [secureheader](https://godoc.org/github.com/kr/secureheader)
- Hapi (Node framework): [blankie](https://github.com/nlf/blankie)
- Koa (Node framework): [koa-helmet](https://github.com/venables/koa-helmet)
- PHP: [Secure Headers](https://github.com/BePsvPT/secure-headers)
- Ring (Clojure framework): [ring-secure-headers](https://github.com/EvanHahn/ring-secure-headers)
- Ruby (and Rails): [Secure Headers](https://github.com/twitter/secureheaders); [rack-secure_headers](https://github.com/frodsan/rack-secure_headers)

There are also other modules like Helmet for Node if you don't like us:

- [hood](https://github.com/seanmonstar/hood)
- [lusca](https://github.com/krakenjs/lusca)

And finally, if you would rather not use Helmet, see [this guide]({{< ref "faq/you-might-not-need-helmet" >}}) which shows how to accomplish what Helmet does without installing anything new.
