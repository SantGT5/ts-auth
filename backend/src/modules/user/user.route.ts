import { FastifyTypedInstance } from "@/types"

import { getUserHandler } from "./user.controller"

const userRoutes = async (app: FastifyTypedInstance) => {
  app.get("/", getUserHandler)
}

export { userRoutes }
