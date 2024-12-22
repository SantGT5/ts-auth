import { FastifyInstance } from "fastify"

import { getUserHandler } from "./user.controller"

const userRoutes = async (app: FastifyInstance) => {
  app.get("/", getUserHandler)
}

export { userRoutes }
