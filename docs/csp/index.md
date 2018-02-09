---
layout: page
title: Content Security Policy
permalink: /docs/csp/
---
In short: the CSP module sets the `Content-Security-Policy` header which can help protect against malicious injection of JavaScript, CSS, plugins, and more.

The attack
----------

Hackers can do lots of bad things if they can put things onto your webpages.

The nastiest attack is probably cross-site scripting (XSS), which is when a hacker puts malicious JavaScript onto your page. If I can run JavaScript on your page, I can do a lot of bad things, from stealing authentication cookies to logging every user action.

There are other things attackers can do, even if they can't execute JavaScript. For example, if I could put a tiny, transparent 1x1 image on your site, I could get a pretty good idea of how much traffic your site gets. If I could get a [vulnerable browser plugin](http://arstechnica.com/security/2015/07/two-new-flash-exploits-surface-from-hacking-team-combine-with-java-0-day/) like Flash to run, I could exploit its flaws and do things you don't want!

There isn't one specific attack that the CSP module prevents. The main thing is this: you don't want anyone putting anything on your webpages that you don't expect.

Read more:

* [Cross-site scripting on Wikipedia](https://en.wikipedia.org/wiki/Cross-site_scripting)
* [Cross-site Scripting on OWASP](https://www.owasp.org/index.php/Cross-site_Scripting_%28XSS%29)
* ["How does a tracking pixel work?" on Quora](https://www.quora.com/How-does-a-tracking-pixel-work)

The header
----------

One of the tricky things about these injection attacks is that the browser doesn't know what's good and what's bad. How can it tell the difference between a legitimate JavaScript file and a malicious one? In many cases, it can't...unless you've defined a Content Security Policy.

Most modern browsers support a header called `Content-Security-Policy`, which is effectively a whitelist of things that are allowed to be on your page. You can whitelist JavaScript, CSS, images, plugins, and much more. Things are *opt-in*, so you're saying "this stuff is allowed" instead of "this stuff is _not_ allowed".

Let's say you've got a website that links to no external resources at all—just your stuff. You could set a header that looks like this:

```
Content-Security-Policy: default-src 'self'
```

This effectively tells the browser "only load things that are from my own domain". If you're running example.com and a user tries to load `https://example.com/my-javascript.js`, it'll work just fine. But if a user tries to load `http://evil.com/evil.js`, it won't load at all!

Now, let's say you want to also allow CSS from Bootstrap's CDN. You could set a CSP that looks like this:

```
Content-Security-Policy: default-src 'self'; style-src 'self' maxcdn.bootstrapcdn.com
```

Now we've whitelisted `'self'` and `maxcdn.bootstrapcdn.com`. The user will be able to load CSS from there, but nothing else. The user won't even be able to load JavaScript or images from that URL, either—only stylesheets.

There are a lot of nuances to CSP: what you can and can't whitelist, browser support for various features, and alternate headers. Refer to the stuff below for more information.

Read more:

- [An introduction to Content Security Policy on HTML5 Rocks](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)
- [Content Security Policy Reference](https://content-security-policy.com/)
- [Can I Use Content Security Policy 1.0](http://caniuse.com/#feat=contentsecuritypolicy)
- [Can I Use Content Security Policy 2.0](http://caniuse.com/#feat=contentsecuritypolicy2)

The code
--------

Helmet's `csp` module helps set Content Security Policies.

You can use this module as part of Helmet:

```javascript
// Make sure you run "npm install helmet" to get the Helmet package.
var helmet = require('helmet')

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}))
```

You can also use it as a standalone module:

```javascript
// Make sure you run "npm install helmet-csp" to get the csp package.
var csp = require('helmet-csp')

app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}))
```

This header is not included in the default Helmet bundle.

### Directives

All of your CSP directives (like `default-src`, `style-src`) are placed under the `directives` option.

```javascript
app.use(csp({
  directives: {
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false  // This is not set.
  }
}))
```

Directives can be kebab-cased (like `script-src`) or camel-cased (like `scriptSrc`); they are equivalent.

The following directives are supported:

* `base-uri` or `baseUri`
* `block-all-mixed-content` or `blockAllMixedContent`
* `child-src` or `childSrc`
* `connect-src` or `connectSrc`
* `default-src` or `defaultSrc`
* `font-src` or `fontSrc`
* `form-action` or `formAction`
* `frame-ancestors` or `frameAncestors`
* `frame-src` or `frameSrc`
* `img-src` or `imgSrc`
* `manifest-src` or `manifestSrc`
* `media-src` or `mediaSrc`
* `object-src` or `objectSrc`
* `plugin-types` or `pluginTypes`
* `prefetch-src` or `prefetchSrc`
* `report-to` or `reportTo`
* `report-uri` or `reportUri`
* `require-sri-for` or `requireSriFor`
* `sandbox` or `sandbox`
* `script-src` or `scriptSrc`
* `style-src` or `styleSrc`
* `upgrade-insecure-requests` or `upgradeInsecureRequests`
* `worker-src` or `workerSrc`

### CSP violations

If you've specified a `reportUri`, browsers will POST any CSP violations to your server. Here's a simple example of an Express route that handles those reports:

```js
// You need a JSON parser first.
app.use(bodyParser.json({
  type: ['json', 'application/csp-report']
}))

app.post('/report-violation', function (req, res) {
  if (req.body) {
    console.log('CSP Violation: ', req.body)
  } else {
    console.log('CSP Violation: No data received!')
  }

  res.status(204).end()
})
```

Not all browsers send CSP violations in the same way, so this might require a little work.

*Note*: If you're using a CSRF module like [csurf](https://github.com/expressjs/csurf), you might have problems handling these violations without a valid CSRF token. The fix is to put your CSP report route *above* csurf middleware.

This module's `reportOnly` option will switch the header to `Content-Security-Policy-Report-Only`. This instructs browsers to report violations to the `reportUri` (if specified) but it will not block any resources from loading.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  reportOnly: true
})
```

You may also set this to a function to decide dynamically whether to use `reportOnly` mode. You could use this for a dynamic kill switch. This function will be called with the request and response objects and must return a boolean.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  reportOnly: function (req, res) {
    if (req.query.cspmode === 'debug') {
      return true
    } else {
      return false
    }
  }
})
```

### Browser sniffing

By default, this module will look at the incoming `User-Agent` header and send different headers depending on the detected browser. For example, Chrome prior to version 25 uses an alternate header called `X-WebKit-CSP`, and this module handles that. If no browser is detected, this module will set all the headers with the 2.0 spec.

To disable this browser sniffing and assume a modern browser, set the `browserSniff` option to `false`.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  browserSniff: false
})
```

To set all headers, including legacy ones, set the `setAllHeaders` option to `true`. Note that this will change the value of the headers based on `User-Agent`. You can disable this by using the `browserSniff: false` option above.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  setAllHeaders: true
})
```

Old Android browsers can be very buggy. This is `false` by default.

```javascript
app.use(csp({
  directives: {
    // ...
  },
  disableAndroid: true
})
```

### Generating nonces

You can dynamically generate nonces to allow inline `<script>` tags to be safely evaluated. Here's a simple example:

```js
var uuid = require('node-uuid')

app.use(function (req, res, next) {
  res.locals.nonce = uuid.v4()
  next()
})

app.use(csp({
  directives: {
    scriptSrc: [
      "'self'",
      function (req, res) {
        return "'nonce-" + res.locals.nonce + "'"  // 'nonce-614d9122-d5b0-4760-aecf-3a5d17cf0ac9'
      }
    ]
  }
}))

app.use(function (req, res) {
  res.end('<script nonce="' + res.locals.nonce + '">alert(1 + 1);</script>')
})
```

### Using CSP with a CDN

The default behavior of CSP is generate headers tailored for the browser that's requesting your page. If you have a CDN in front of your application, the CDN may cache the wrong headers, rendering your CSP useless. Make sure to eschew a CDN when using this module or set the `browserSniff` option to `false`.
