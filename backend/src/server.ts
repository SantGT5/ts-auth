import { env } from "@/config"
import boxen from "boxen"

import { app } from "./app"

const port = env.port

app
  .listen({ port, host: "0.0.0.0" })
  .then(url => {
    const environment = env.environment
    const timestamp = new Date().toLocaleString()

    const serverMessage = `
🚀 ${"Server Status".padEnd(15)}: RUNNING
🌍 ${"Environment".padEnd(15)}: ${environment.toUpperCase()}
🔗 ${"URL".padEnd(15)}: ${url}
📄 ${"Swagger".padEnd(15)}: ${url}/swagger
⏰ ${"Started At".padEnd(15)}: ${timestamp}
    `

    // eslint-disable-next-line no-console
    console.log(
      boxen(serverMessage, {
        margin: 1,
        padding: 1,
        align: "left",
        borderColor: "green",
        borderStyle: "double",
        titleAlignment: "center",
        title: "🟢 Server Info",
      })
    )
  })
  .catch(error => {
    const timestamp = new Date().toLocaleString()

    const errorMessage = `
❌ ${"Server Status".padEnd(15)}: FAILED
⏰ ${"Timestamp".padEnd(15)}: ${timestamp}
    `

    console.error(
      boxen(errorMessage, {
        margin: 1,
        padding: 1,
        align: "left",
        borderColor: "red",
        borderStyle: "double",
        titleAlignment: "center",
        title: "🔴 Server Error",
      })
    )

    console.error(`${"Error".padEnd(15)}: ${error.message}`)

    process.exit(1)
  })
