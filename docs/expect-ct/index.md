---
layout: page
title: Expect-CT
permalink: /docs/expect-ct/
---
The `Expect-CT` HTTP header tells browsers to expect Certificate Transparency. For more about Certificate Transparency and this header, see [this blog post](https://scotthelme.co.uk/a-new-security-header-expect-ct/) and the [in-progress spec](https://datatracker.ietf.org/doc/draft-stark-expect-ct).

Usage:

```javascript
var expectCt = require('expect-ct')

// Sets Expect-CT: max-age=123
app.use(expectCt({ maxAge: 123 }))

// Sets Expect-CT: enforce; max-age=123
app.use(expectCt({
  enforce: true,
  maxAge: 123
}))

// Sets Expect-CT: enforce; max-age=30; report-uri="http://example.com/report"
app.use(expectCt({
  enforce: true,
  maxAge: 30,
  reportUri: 'http://example.com/report'
}))
```
