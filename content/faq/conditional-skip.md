---
title: "Conditionally skipping headers"
---
To skip a header conditionally, create your own small middleware function that conditionally calls different invocations of Helmet.

For example, you could decide to conditionally enable a Content Security Policy for a subset of users. Here's how that could look:

```javascript
const helmetWithCsp = helmet()
const helmetWithoutCsp = helmet({contentSecurityPolicy:false})

app.use((req, res, next) => {
  if (req.user.isContentSecurityPolicyEnabled) {
    helmetWithCsp(req,res,next)
  } else {
    helmetWithoutCsp(req,res,next)
  }
});
```
