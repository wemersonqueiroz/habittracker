import Fastify from "fastify"
import cors from "@fastify/cors"

import { appRoutes } from "./routes"

const app = Fastify()

app.register(cors)
app.register(appRoutes)
// HTTP Method: GET, Post, Put, Patch, Delete

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333")
})
