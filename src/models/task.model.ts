import { Schema, model } from "mongoose"
import { Task, TaskModel } from "../types/task.type"
import { userReference } from "./user.model"

const Tasks = new Schema<Task, TaskModel>({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  dateEnd: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  status: {
    type: Number,
    required: true,
    index: true,
    trim: true,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: userReference
  }
})

export default model("Task", Tasks)
