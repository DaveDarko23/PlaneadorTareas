import Tasks from "../models/task.model"
import { Task } from "../types/task.type"
import boom from "@hapi/boom"

const noConnecting = (error) =>
    console.log("Error while connecting to the BD", error)

class TaskService {
    async create(task: Task) {
        const newTask = await Tasks.create(task).catch(() =>
            console.log("Could not save Task, im sorry")
        )

        return newTask
    }

    async findAll() {
        const tasks = await Tasks.find().catch((error) => noConnecting(error))
        return tasks
    }

    async findById(id: string) {
        const task = await Tasks.findById(id).catch((error) =>
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
