const { createClient } = require('@commercetools/sdk-client')
const { createAuthMiddlewareForClientCredentialsFlow } = require('@commercetools/sdk-middleware-auth')
const { createHttpMiddleware } = require('@commercetools/sdk-middleware-http')
const fetch = require('node-fetch')

const projectKey = 'workshop-commercetools'

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'ypYkpF_cyGIQFvD0fYUvvHiR',
    clientSecret: 'X-gYNLFpkscC67DelWERyycUVnUVTr3G',
  },
  scopes: ['manage_cart_discounts:workshop-commercetools manage_extensions:workshop-commercetools manage_discount_codes:workshop-commercetools manage_order_edits:workshop-commercetools'],
  fetch,
})
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
})
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
})

module.exports = { client }
