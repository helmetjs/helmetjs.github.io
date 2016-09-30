---
layout: page
title: Hide Powered-By
permalink: /middleware/hide-powered-by/
---
In short: The Hide Powered-By middleware removes the `X-Powered-By` header to make it slightly harder for attackers to see what potentially-vulnerable technology powers your site.

The "attack"
------------

Hackers can exploit known vulnerabilities in Express and Node if they know you're using it. Express (and other web technologies like PHP) set an `X-Powered-By` header with every request, indicating what technology powers the server. Express, for example, sets this, which is a dead giveaway that your server is powered by Express.

A hacker can use this information to their advantage. If they know of a vulnerability in Express or Node and they see your site is Express-powered, they can be more targeted.

The fix
-------

The fix is to simply remove the header.

To be fair, if a determined hacker doesn't see this header, they won't suddenly give up. They could look for other clues to find out that you're using Node, or they could simply try a bunch of attacks and see if any of them work. Simply omitting this header doesn't mean that nobody can exploit vulnerabilities; it may slow them down slightly or deter a lazy hacker.

There is also a slight performance benefit when removing this header because fewer bytes need to be sent.

Read more:

- ["Removing the header provides no security benefits"](https://github.com/expressjs/express/pull/2813#issuecomment-159270428)

The code
--------

This middleware is most useful when included in the default Helmet bundle, like this:

```javascript
var helmet = require('helmet')

app.use(helmet())
```

If you are using each of Helmet's headers piece-by-piece, there's a better way to get this header's behavior with a feature built into Express:

```javascript
app.disable('x-powered-by')
```

If you still want to use this module, it's allowed. You can use it as part of Helmet:

```javascript
app.use(helmet.hidePoweredBy())
```

Or you can require the individual module:

```javascript
var hidePoweredBy = require('hide-powered-by')

app.use(helmet.hidePoweredBy())
```

You can also *lie* in this header to throw a hacker off the scent. For example, to make it look like your site is powered by PHP:

```javascript
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }))
```
