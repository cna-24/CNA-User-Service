import { Hono } from 'hono'
import { html } from "hono/html"
import { swaggerUI } from '@hono/swagger-ui'

const swagger = new Hono()

swagger.get('/', swaggerUI({ url: 'http://localhost:5500/doc/swagger.yaml' }))

export default swagger