import Users from "../models/user.model"
import { User } from "../types/user.type"
import boom from "@hapi/boom"
import bcrypt from "bcrypt"

class UserService {
  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await Users.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log("Could not save user", error)
    })

    if (!newUser) throw boom.badRequest("Could not create user")

    return newUser
  }

  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log("Could not retrieve user info", error)
    })

    if (!user) throw boom.notFound("User not found")

    return user
  }
}

export default UserService
