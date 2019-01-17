---
layout: page
title: Feature-Policy
permalink: /docs/feature-policy/
---
In short: Helmet's `featurePolicy` middleware lets you restrict which browser features can be used. For example, you can disable fullscreen or vibration APIs.

The "attack"
------------

It's a good idea to limit your code's the surface area. Less stuff means less to attack.

Web browsers have lots of different features, from vibration to fullscreen to microphone access. While some of these can be useful, you may not wish to use all of them, and you may not want any third-party scripts you include to use them either.

The header
----------

The `Feature-Policy` header tells browsers which features you can use. For example, if you want to disable notifications for everyone and allow payments from `example.com`, you could send a header like this:

```
Feature-Policy: notifications 'none'; payments example.com
```

Read more:

- ["A new security header: Feature-Policy"](https://scotthelme.co.uk/a-new-security-header-feature-policy/)
- [Feature Policy](https://developers.google.com/web/updates/2018/06/feature-policy)

The code
--------

Helmet's `featurePolicy` middleware helps you set this header.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
const helmet = require('helmet')

app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    payment: ['example.com'],
    syncXhr: ["'none'"]
  }
}))
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install feature-policy" to get this package.
const featurePolicy = require('feature-policy')

app.use(featurePolicy({
  features: {
    vibrate: ["'self'"],
    syncXhr: ["'none'"]
  }
}))
```
