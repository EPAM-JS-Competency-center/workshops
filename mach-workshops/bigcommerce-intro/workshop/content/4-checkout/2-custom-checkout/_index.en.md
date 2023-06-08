+++
title = "2. Custom checkout"
weight = 13
+++

## If you would like to have a bit more control you may use custom checkout. Let's see how you can enable it.

Detailed documentation you may find at https://developer.bigcommerce.com/stencil-docs/customizing-checkout/installing-custom-checkouts

In order to use custom checkout you need to create a fork from https://github.com/bigcommerce/checkout-js

In order to build and deploy you should install required dependencies at just downloaded repository. And build the checkout

```
npm ci
npm run build
```

NOTE: you may not be able to build the checkout from windows OS.

## Hosting a custom checkout
You will need to host the custom checkout file online so it can be served by the store. You can use a hosting service, such as Amazon S3. Using an external host will allow you the freedom to automate the build process if you wish and push updates automatically from your local machine.

You can upload a custom checkout to your store's server using WebDAV. Just upload all files and folders from dist folder into webDAV content/checkout folder.

In order to enable custom checkout just navigate to Open Control Panel > Settings > Checkout.
   - Choose "Custom Checkout" checkout type.
   - Enter script URL at "Custom Checkout Settings" section, e.g. webdav:checkout/auto-loader-1.296.0.js
   - Select "This checkout supports Optimized One-Page Checkout settings." "Use the same script URL for the custom order confirmation page." checkboxes.
     ![](../../static/images/checkout/2.png)

### With this settings you will get the same checkout as you have by default. At the same time you will be able to customize it.
