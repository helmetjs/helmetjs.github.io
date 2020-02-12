---
layout: page
title: X-Permitted-Cross-Domain-Policies
permalink: /docs/crossdomain/
---
In short: Helmet's `crossdomain` middleware prevents Adobe Flash and Adobe Acrobat from loading content on your site.

The "attack"
------------

It's a good idea to limit your code's the surface area. Less stuff means less to attack.

Adobe Flash and Adobe Acrobat can load content from your domain even from other sites (in other words, cross-domain). This could cause unexpected data disclosure in rare cases or extra bandwidth usage.

The header
----------

The `X-Permitted-Cross-Domain-Policies` header tells clients like Flash and Acrobat what cross-domain policies they can use. If you don't want them to load data from your domain, set the header's value to `none`. For example:

```
X-Permitted-Cross-Domain-Policies: none
```

If Flash loads something from your site and sees that, it'll know that it shouldn't load data from your domain.

The header has other values that require you to create a `crossdomain.xml` file defining what your cross-domain policy is. You can read more about this in the links below.

Read more:

- ["X-Permitted-Cross-Domain-Policies" section on OWASP](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project#xpcdp)
- [Adobe's spec for cross-domain policies](https://www.adobe.com/devnet-docs/acrobatetk/tools/AppSec/xdomain.html)

The code
--------

Helmet's `crossdomain` middleware helps you set this header.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
const helmet = require('helmet')

app.use(helmet.permittedCrossDomainPolicies())
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install helmet-crossdomain" to get this package.
const permittedCrossDomainPolicies = require('helmet-crossdomain')

app.use(permittedCrossDomainPolicies())
```

This header's value is `none` by default. You can set the header's value to other things, too:

```javascript
app.use(permittedCrossDomainPolicies({ permittedPolicies: 'master-only' }))
app.use(permittedCrossDomainPolicies({ permittedPolicies: 'by-content-type' }))
app.use(permittedCrossDomainPolicies({ permittedPolicies: 'all' }))
```
