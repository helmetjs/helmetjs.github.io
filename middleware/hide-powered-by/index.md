---
layout: page
title: Hide Powered-By
permalink: /middleware/hide-powered-by/
---
In short: The Hide Powered-By middleware removes the `X-Powered-By` header to make it slightly harder for attackers to see what potentially-vulnerable technology powers your site.

The attack
----------

Hackers can exploit known vulnerabilities in Express and Node if they know you're using it. Express (and other web technologies like PHP) set an TODO header with every request, indicating what technology powers the server. Express, for example, sets this, which is a dead giveaway.

TODO

A hacker can use this information to their advantage.

To be fair, if a determined hacker doesn't see this header, they won't suddenly give up. They could look for other clues to find out that you're using Node, or they could simply try a bunch of attacks and see if any of them work. Simply omitting this header doesn't mean nobody can exploit vulnerabilities; it may slow them down slightly and deter a lazy hacker.

Removing the header also has a slight performance benefit.

Read more:

- Doug Wilson comment

The code
--------

This middleware is most useful when included in the default Helmet bundle, like this:

TODO full helmet example

If you are using each of Helmet's headers piece-by-piece, there's a better way to get this header's behavior with a feature built into Express:

TODO

If you still want to use this header, it's allowed. You can use it as part of Helmet:

Or you can require the individual module:

You can disable the header by using it with no arguments:

TODO

You can also *lie* in this header to throw a hacker off the scent. For example, to make it look like your site is powered by PHP:

TODO
