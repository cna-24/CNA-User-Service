import { Hono } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'

const swagger = new Hono()

// Use the middleware to serve Swagger UI at /ui
// Vi borde använda de här med swagger-UI: https://hono.dev/snippets/zod-openapi
swagger.get('/ui', swaggerUI({url: '/doc' }))

export default swagger