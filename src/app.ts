import express from "express"
import mongoose from "mongoose"
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from "./middlewares/error.handler"
import routerApi from "./routes"
import { config } from "./config/config"
import bodyParser from "body-parser"
import passport from "passport"
import "./utils/auth"
import cors from "cors"
// const bodyParser = require("body-parser")

const { mongoUri, port } = config

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

const connectDB = () => {
  mongoose.connect(mongoUri)
}

app.use(passport.initialize())
routerApi(app)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  connectDB()
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)
