import { fastifyCors } from "@fastify/cors"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"

import { fastify } from "fastify"

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: "*" })

app.register(fastifySwagger, {
  openapi: {
    openapi: "3.1.1",
    info: {
      version: "1.0.0",
      title: "User Auth",
      description: "Testing the User Auth API",
    },
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: "/swagger",
  staticCSP: true,
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
  },
  transformStaticCSP: header => header,
})

app.get("/", (_, reply) => {
  return reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ hello: "world" })
})

export { app }
