import Tasks from "../models/task.model"
import { Task } from "../types/task.type"
import boom from "@hapi/boom"
import { ObjectId } from "mongoose"

const noConnecting = (error) =>
  console.log("Error while connecting to the BD", error)

class TaskService {
  async create(task: Task, userId: ObjectId) {
    const newTask = await Tasks.create({
      ...task,
      user: userId
    }).catch(() => console.log("Could not save Task, im sorry"))
    const existingTask = await this.findById((newTask as any)._id)
    return existingTask.populate([{ path: "user", strictPopulate: false }])
  }

  async findAll() {
    const tasks = await Tasks.find()
      .populate([{ path: "user", strictPopulate: false }])
      .catch((error) => noConnecting(error))
    return tasks
  }

  async findById(id: string) {
    const task = await Tasks.findById(id).catch((error) => noConnecting(error))
    if (!task) throw boom.notFound("Task not found")
    return task
  }

  async findByMyId(user: string) {
    const task = await Tasks.find({ user }).catch((error) =>
      noConnecting(error)
    )
    if (!task) throw boom.notFound("Task not found")
    return task
  }

  async findByName(name: string) {
    const task = await Tasks.findOne({ name }).catch((error) =>
      noConnecting(error)
    )
    if (!task) throw boom.notFound("Task not found")
    return task
  }
}

export default TaskService
