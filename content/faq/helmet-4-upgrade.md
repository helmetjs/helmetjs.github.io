---
title: "Helmet 4 upgrade guide"
---

Several things were changed in Helmet 4.

### How do I upgrade?

`npm install helmet@4` should upgrade your installation of Helmet to version 4.

If you had previously installed `@types/helmet`, they are no longer needed, as TypeScript types are now bundled with Helmet.

If you're using Node <10 (such as Node 8), Helmet may not work for you. You should upgrade anyway, because Node 8 [reached end-of-life](https://github.com/nodejs/Release) at the end of 2019.

### Which middlewares were removed?

Three middlewares were removed from Helmet in version 4:

- `helmet.featurePolicy` was removed because the `Feature-Policy` header has been deprecated. If you still need it, use the [`feature-policy` package](https://www.npmjs.com/package/feature-policy), which is still maintained by the Helmet organization.
- `helmet.hpkp` was removed because the `Public-Key-Pins` header has been deprecated. If you still need it, use the [`hpkp` npm package](https://www.npmjs.com/package/hpkp), which is still maintained by the Helmet organization.
- `helmet.noCache` was removed because it isn't directly relevant to security. If you still need it, use the [`nocache` npm package](https://www.npmjs.com/package/nocache), which is still maintained by the Helmet organization.

### Which middlewares were added by default?

When you use the top-level Helmet function (i.e., `app.use(helmet())`), Helmet 4 now includes the following middlewares by default:

- `helmet.contentSecurityPolicy` (which sets the `Content-Security-Policy` header; see below)
- `helmet.expectCt` (which sets the `Expect-CT` header)
- `helmet.permittedCrossDomainPolicies` (which sets the `X-Permitted-Cross-Domain-Policies` header)
- `helmet.referrerPolicy` (which sets the `Referrer-Policy` header)

These were present in Helmet 3 but were disabled by default.

### What changed in the `Content-Security-Policy` middleware?

The `Content-Security-Policy` middleware had the biggest changes.

#### There is now a default policy

Helmet 3 disabled CSP by default. Helmet 4 does not, and sets one. If this is causing problems, you can disable the CSP header:

```js
app.use(helmet({
  contentSecurityPolicy: false,
}));
```

Alternatively, for more security, you can craft a Content Security Policy for your site.

#### Removal of browser sniffing and related features

The CSP middleware used to do browser sniffing in an attempt to set the best CSP for the given browser. For example, old versions of Safari used the `X-Webkit-CSP` header instead of `Content-Security-Policy`. This was removed because it was brittle, slow, and unnecessary for modern browsers.

This means that a few options were removed: `browserSniff`, `disableAndroid`, and `setAllHeaders`.

If you want to set legacy headers, see the guide ["Setting legacy Content Security Policy headers in Helmet 4"](https://github.com/helmetjs/helmet/wiki/Setting-legacy-Content-Security-Policy-headers-in-Helmet-4).
