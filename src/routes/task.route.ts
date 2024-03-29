import express from "express"
import { Task } from "../types/task.type"
import TaskService from "../services/task.service"
import passport from "passport"
import { jwtRequestType } from "../types/user.type"
import { ObjectId } from "mongoose"

const router = express.Router()
const service = new TaskService()

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: jwtRequestType, res) => {
    const {
      user: { sub }
    } = req
    const task: Task = req.body
    const newTask = await service.create(task, sub as unknown as ObjectId)
    res.status(200).json(newTask)
  }
)

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req: jwtRequestType, res, next) => {
    try {
      // const { user } = req
      const tasks = await service.findAll()
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  "/findMyTasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const task = await service.findByMyId(req.query.user as string)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  "/findIdTask/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const task = await service.findById(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  "/findTask",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      console.log("Estoy aqui " + req.query.name)
      const task = await service.findByName(req.query.name as string)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

export default router
