---
layout: page
title: Content Security Policy
permalink: /csp/
---
In short: the CSP module sets the `Content-Security-Policy` header which can help protect against malicious injection of JavaScript, CSS, plugins, and more.

The attack
----------

Hackers can do lots of bad things if they can put things onto your webpages.

The nastiest attack is probably cross-site scripting (XSS), which is when a hacker puts malicious JavaScript onto your page. If I can run JavaScript on your page, I can do a lot of bad things, from stealing authentication cookies to logging every user action.

There are other things attackers can do, even if they can't execute JavaScript. For example, if I could put a tiny, transparent 1x1 image on your site, I could get a pretty good idea of how much traffic your site gets. If I could get a vulnerable browser plugin like Flash to run, I could exploit its flaws and do things you don't want!

There isn't one specific attack here. The thesis: you don't want anyone putting anything on your webpages that you don't expect.

Read more:

The header
-----

Most modern browsers support a header called `Content-Security-Policy`, which is effectively a whitelist of things that are allowed to be on your page.
