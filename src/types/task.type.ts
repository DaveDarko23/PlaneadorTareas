import type { Model } from "mongoose"
import { User } from "./user.type"

export type Task = {
  id?: string
  name: string
  description?: string
  date?: string
  dateEnd: string
  status?: number
  user: User
}

export type TaskModel = Model<Task>
