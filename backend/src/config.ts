const config = {
  port: Number(process.env.BACKEND_PORT) || 8081,
  postgresUrl: process.env.POSTGRES_URL || "",
}

export { config }
