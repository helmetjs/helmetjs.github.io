---
title: "Content Security Policy + nonce example"
---

Some `Content-Security-Policy` directives support a nonce value. It is one way to avoid using `unsafe-inline` with inline scripts and styles.

At a high level, you'll do the following:

1. Generate a nonce value, unique for each request. Save it to `res.locals.cspNonce` or equivalent.
1. Tell Helmet about this nonce.
1. Add the `nonce` HTML attribute to your relevant `<script>` or `<style>` tags.

## Step 1: generate a nonce value

First, you'll need to generate a nonce value and save it to `res.locals`. It should be difficult to guess this nonce, so we'll generate 32 random bytes (256 random bits) and convert them to a hex string.

```javascript
import * as crypto from "node:crypto";

// ...

app.use((_req, res, next) => {
  // Asynchronously generate a unique nonce for each request.
  crypto.randomBytes(32, (err, randomBytes) => {
    if (err) {
      // If there was a problem, bail.
      next(err);
    } else {
      // Save the nonce, as a hex string, to `res.locals` for later.
      res.locals.cspNonce = randomBytes.toString("hex");
      next();
    }
  });
});
```

## Step 2: tell Helmet about this nonce

Next, tell Helmet about this nonce. More specifically, tell the `script-src` directive about it.

In this example, we plan to use this nonce with a `<script>` tag. If you want to use an inline style instead, use the `styleSrc` directive.

```javascript
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          // Include this nonce in the `script-src` directive.
          (_req, res) => `'nonce-${res.locals.cspNonce}'`,
        ],
      },
    },
  }),
);
```

## Step 3: put the nonce in your HTML

Finally, you need to set the `nonce` attribute of your `<script>` or `<style>` tag.

It's likely that you're using a templating engine like Pug or EJS, but we'll do something simpler for this example and just send HTML inline.

```javascript
app.get("/", (_req, res) => {
  // When rendering the `<script>` tag, include the nonce.
  res.send(`
    <script nonce="${res.locals.cspNonce}">
      console.log("Hello world!");
    </script>
  `);
});
```

If you've done everything correctly, you should see "Hello world!" in the console. You should also see a difference `nonce` value every time you refresh the page.

## Full app code

Here's the full source code for this example.

```javascript
import express from "express";
import helmet from "helmet";
import * as crypto from "node:crypto";

const app = express();

app.use((_req, res, next) => {
  // Asynchronously generate a unique nonce for each request.
  crypto.randomBytes(32, (err, randomBytes) => {
    if (err) {
      // If there was a problem, bail.
      next(err);
    } else {
      // Save the nonce, as a hex string, to `res.locals` for later.
      res.locals.cspNonce = randomBytes.toString("hex");
      next();
    }
  });
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          // Include this nonce in the `script-src` directive.
          (_req, res) => `'nonce-${res.locals.cspNonce}'`,
        ],
      },
    },
  }),
);

app.get("/", (_req, res) => {
  // When rendering the `<script>` tag, include the nonce.
  res.send(`
    <script nonce="${res.locals.cspNonce}">
      console.log("Hello world!");
    </script>
  `);
});

app.listen(3000);
```