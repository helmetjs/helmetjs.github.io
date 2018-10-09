---
layout: page
title: Don't Sniff Mimetype
permalink: /docs/dont-sniff-mimetype/
---

In short: the Don't Sniff Mimetype middleware, `noSniff`, helps prevent browsers from trying to guess ("sniff") the MIME type, which can have security implications. It does this by setting the `X-Content-Type-Options` header to `nosniff`.

The attack
----------

MIME types are a way of determining what kind of file you're looking at. PNG images have the type `image/png`; JSON files are `application/json`; JavaScript files are typically `text/javascript`. When your browser loads a file, it reads the server's `Content-Type` header to determine what the thing is.

Let's say that your browser sees this:

```html
<script src="https://example.com/my-javascript"></script>
```

It'll go and load `my-javascript` from `example.com`. If `example.com` sends a `Content-Type` header of `text/javascript`, your browser will execute the contents of `my-javascript` as JavaScript.

But what if `my-javascript` is an HTML page with a `Content-Type` of `text/html`? If your browser does something called "MIME sniffing" (which some do), it will look at the contents of the file, decide if it looks like JavaScript, and execute it if so. This means that a server can send the wrong `Content-Type` and JavaScript can still get executed.

This MIME sniffing can be an attack vector. A user could upload an image with the `.jpg` file extension but its contents are actually HTML. Visiting that image could cause the browser to "run" the HTML page, which could contain malicious JavaScript! Perhaps the nastiest attack is called [Rosetta Flash](https://miki.it/blog/2014/7/8/abusing-jsonp-with-rosetta-flash/), which allows someone to load a malicious Flash plugin instead of data!

Read more:

- ["MIME type" on Wikipedia](https://en.wikipedia.org/wiki/Media_type)
- ["MIME Sniffing: feature or vulnerability?"](https://blog.fox-it.com/2012/05/08/mime-sniffing-feature-or-vulnerability/)
- ["MIME sniffing in Internet Explorer enables cross-site scripting attacks"](http://www.h-online.com/security/features/Risky-MIME-sniffing-in-Internet-Explorer-746229.html)
- ["Abusing JSONP with Rosetta Flash"](https://miki.it/blog/2014/7/8/abusing-jsonp-with-rosetta-flash/)
- [MIME Sniffing live standard](https://mimesniff.spec.whatwg.org/)
- [Cross Origin Resource Blocking in Chrome](https://developers.google.com/web/updates/2018/07/site-isolation)

The header
----------

The `X-Content-Type-Options` header tells browsers not to sniff MIME types. When this header is set to `nosniff`, browsers won't sniff the MIME type—they will trust what the server says and block the resource if it's wrong.

Read more:

- ["X-Content-Type-Options" on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
- ["What is 'X-Content-Type-Options=nosniff'?" on Stack Overflow](https://stackoverflow.com/questions/18337630/)
- ["Reducing MIME type security risks" on MSDN](https://msdn.microsoft.com/en-us/library/gg622941(v=vs.85).aspx)
- ["IE8 Security Part V: Comprehensive Protection" on MSDN](https://blogs.msdn.microsoft.com/ie/2008/07/02/ie8-security-part-v-comprehensive-protection/)

The code
--------

The `noSniff` middleware will set the `X-Content-Type-Options` header to `nosniff` for every request.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
var helmet = require('helmet')

// Sets "X-Content-Type-Options: nosniff".
app.use(helmet.noSniff())
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install dont-sniff-mimetype" to get this package.
var noSniff = require('dont-sniff-mimetype')

// Sets "X-Content-Type-Options: nosniff".
app.use(noSniff())
```

This header is included in the default Helmet bundle.
