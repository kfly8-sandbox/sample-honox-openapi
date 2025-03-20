import { Hono } from 'hono';
import { validator as aValidator, resolver } from "hono-openapi/arktype"
import { type } from 'arktype';

const nameSchema = type({
	name: 'string',
});

const app = new Hono();

app.get('/:name',
	aValidator('param', nameSchema),
	(c) => {
		const { name } = c.req.valid('param');
		return c.json({ name });
	}
);

export default app;
