import { FastifyReply, FastifyRequest } from "fastify"

const getUserHandler = async (_: FastifyRequest, res: FastifyReply) => {
  return res
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({ hello: "world" })
}

export { getUserHandler }
