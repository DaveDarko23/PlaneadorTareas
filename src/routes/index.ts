import express from "express"
import CategoryRouter from "./category.route"
import TaskRouter from "./task.route"
import UserRouter from "./user.route"
import AuthRouter from "./auth.route"
import unprotectedRouter from "./unprotected.route"

const routerApi = (app) => {
  const router = express.Router()
  app.use("/api/v1", router)
  router.use("/categories", CategoryRouter)
  router.use("/tasks", TaskRouter)
  router.use("/users", UserRouter)
  router.use("/auth", AuthRouter)
  router.use("/unprotected", unprotectedRouter)
}

export default routerApi
