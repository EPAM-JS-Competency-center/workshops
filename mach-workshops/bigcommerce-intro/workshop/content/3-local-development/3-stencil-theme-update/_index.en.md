+++
title = "3. Stencil Theme Update"
weight = 13
+++

## Project structure

secrets.stencil.json contains stencil token

config.stencil.json contains other stencil settings

config.json contains storefront configurations

You will be mainly working with the following folders:

- templates > layout: theme layouts. You could create a new one and apply it.
- templates > pages/components: theme pages and components. Please, review handlebars helpers in order to know available options to manipulate with data https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference
- assets > js > theme > \*.js: mainly pages/components logic and handlers.
- assets > scss > \*.scss: theme styles
- lang > \*.json: translations

## How to debug handlebars context?

First of all the context could be different on different pages.
The second is you cannot mutate it or control.
And the third, just run http://localhost:3000/?debug=context and you will see the context of current page.

This will help you to understand which data is used in templates.

## Let's make a small change and deploy theme.

1. For example find .navPages-container css selector and update styles with:

```
border: 1px solid red;
```

You may see the navigation menu has changed on the home page.

2. Let's deploy the change to your store. Just run:

```
stencil push -a
```

This command will push the theme and activate it.

3. Open you store and review the change is applied.

Fantastic! We passed base scenario which you may need working with BigCommerce.
