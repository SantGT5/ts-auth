import { env } from "@/config"
import fastifyPostgres from "@fastify/postgres"
import boxen from "boxen"
import fp from "fastify-plugin"

import { FastifyInstance } from "fastify"

const postgresConnector = async (fastify: FastifyInstance) => {
  fastify.register(fastifyPostgres, {
    max: 10,
    idleTimeoutMillis: 30000,
    connectionString: env.postgresUrl,
  })

  fastify.ready(async () => {
    try {
      const client = await fastify.pg.pool.connect()
      const timestamp = new Date().toLocaleString()

      const serverMessage = `🛢️ ${"PostgreSQL".padEnd(15)}: CONNECTED ✅
⏰ ${"Started At".padEnd(15)}: ${timestamp}`

      // eslint-disable-next-line no-console
      console.log(
        boxen(serverMessage, {
          margin: 1,
          padding: 1,
          align: "left",
          borderColor: "green",
          borderStyle: "double",
          titleAlignment: "center",
          title: "🟢 PostgreSQL",
        })
      )

      client.release()
    } catch (err) {
      const timestamp = new Date().toLocaleString()

      const serverMessage = `🛢️ ${"PostgreSQL".padEnd(15)}: FAILED ❌
⏰ ${"Started At".padEnd(15)}: ${timestamp}`

      // eslint-disable-next-line no-console
      console.log(
        boxen(serverMessage, {
          align: "left",
          borderColor: "red",
          borderStyle: "double",
          titleAlignment: "center",
          title: "🔴 PostgreSQL",
        })
      )

      fastify.log.error("❌ Unable to connect to PostgreSQL:", err)
      process.exit(1)
    }
  })
}

export default fp(postgresConnector)
