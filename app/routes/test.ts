import { Hono } from 'hono';

import { z } from 'zod';
import { describeRoute } from 'hono-openapi'
import { validator, resolver } from 'hono-openapi/zod';

const app = new Hono();

const _request = z.object({
  name: z.string(),
});

const _response = z.object({
  message: z.string(),
});

app.get(
  '/',
  describeRoute({
    description: 'Say hello to the user',
    responses: {
      200: {
      description: 'Successful response',
      content: {
        'application/json': { schema: resolver(_response) },
      },
      },
    }
  }),
  validator('query', _request),
  (c) => {
    const { name } = c.req.valid('query');
    return c.json({ message: `Hello, ${name}!` });
  }
);

export default app;
