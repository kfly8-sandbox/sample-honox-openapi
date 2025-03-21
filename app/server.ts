import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'

import { Hono } from 'hono';
import { openAPISpecs } from 'hono-openapi'
import { apiReference } from '@scalar/hono-api-reference'

const app = new Hono();

app.get(
  '/docs',
  apiReference({
  theme: 'saturn',
  url: '/openapi',
  })
)

// NOT WORKING...
app.get(
  '/openapi',
  openAPISpecs(app)
)

const a = createApp(app)

showRoutes(a)

export default a
