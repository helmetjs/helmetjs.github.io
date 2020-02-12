---
layout: page
title: IE No Open
permalink: /docs/ienoopen/
---
In short: this middleware sets the `X-Download-Options` to prevent Internet Explorer from executing downloads in your site's context.

The attack
----------

This attack only affects old versions of Internet Explorer.

Some web applications will serve untrusted HTML for download. For example, you could allow users to upload and download HTML files.

By default, old versions of Internet Explorer will allow you to open those HTML files in the context of your site, which means that an untrusted HTML page could start doing bad things in the context of your pages. For more, see [this MSDN blog post](https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/).

The header
----------

The `X-Download-Options` header can be set to `noopen`. This will prevent old versions of Internet Explorer from allowing malicious HTML downloads to be executed in the context of your site.

Read more:

- ["IE8 Security Part V: Comprehensive Protection" on MSDN](https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/)

The code
--------

Helmet's `ieNoOpen` is a relatively simple middleware that will set the `X-Download-Options` header to `noopen`.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
const helmet = require('helmet')

// Sets "X-Download-Options: noopen".
app.use(helmet.ieNoOpen())
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install ienoopen" to get the ienoopen package.
const ieNoOpen = require('ienoopen')

// Sets "X-Download-Options: noopen".
app.use(ieNoOpen())
```

This header is included in the default Helmet bundle.
