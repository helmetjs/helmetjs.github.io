---
layout: page
title: Middleware
permalink: /middleware/
---
Helmet is a collection of 11 middleware to help set some security headers.

| Module | Included by default? |
|---|---|
| [contentSecurityPolicy](csp) for setting Content Security Policy |  |
| [dnsPrefetchControl](dns-prefetch-control) controls browser DNS prefetching | ✓ |
| [frameguard](frameguard) to prevent clickjacking | ✓ |
| [hidePoweredBy](hide-powered-by) to remove the X-Powered-By header | ✓ |
| [hpkp](hpkp) for HTTP Public Key Pinning |  |
| [hsts](hsts) for HTTP Strict Transport Security | ✓ |
| [ieNoOpen](ienoopen) sets X-Download-Options for IE8+ | ✓ |
| [noCache](nocache) to disable client-side caching |  |
| [noSniff](dont-sniff-mimetype) to keep clients from sniffing the MIME type | ✓ |
| [referrerPolicy](referrer-policy) to hide the Referer header |  |
| [xssFilter](xss-filter) adds some small XSS protections | ✓ |
