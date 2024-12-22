import boxen from "boxen"

import { app } from "./app"
import { config } from "./config"

const port = config.port

app.listen({ port, host: "0.0.0.0" }).then(url => {
  const environment = process.env.NODE_ENV || "development"
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
      title: " 🟢 Server Info ",
    })
  )
})
