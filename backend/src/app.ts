import { fastifyCors } from "@fastify/cors"
import helmet from "@fastify/helmet"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod"

import { fastify } from "fastify"

import { userRoutes } from "./modules"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: "*" })

// Enable Helmet for Security Headers
app.register(helmet, {
  global: true,
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true,
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https: 'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
})

app.register(fastifySwagger, {
  openapi: {
    openapi: "3.1.1",
    info: {
      version: "1.0.0",
      title: "User Auth",
      description: "Testing the User Auth API",
    },
    servers: [
      {
        url: "/backend",
        description: "Backend API server",
      },
    ],
  },
  transform: jsonSchemaTransform,
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

// V1 API Middleware
app.register(
  async appInstance => {
    appInstance.register(userRoutes, { prefix: "/users" })
  },
  { prefix: "/v1/api" }
)

export { app }
