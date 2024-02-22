import type { Model } from "mongoose"

export type Task = {
    id?: string
    name: string
    description?: string
    date?: string
    dateEnd: string
    status?: number
}

export type TaskModel = Model<Task>
