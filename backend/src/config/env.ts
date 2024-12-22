const env = {
  environment: process.env.NODE_ENV || "dev",
  postgresUrl: process.env.POSTGRES_URL || "",
  port: Number(process.env.BACKEND_PORT) || 8081,
}

export { env }
