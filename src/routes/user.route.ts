import express from "express"
import { User } from "../types/user.type"
import UserService from "../services/user.service"
import passport from "passport"

const router = express.Router()
const service = new UserService()

router.post("/", async (req, res, next) => {
  try {
    const user: User = req.body
    const newUser = await service.create(user)
    res.status(201).json({ user: newUser.toClient() })
  } catch (error) {
    next(error)
  }
})

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { email } = req.query
      const user = await service.findByEmail(email as string)
      console.log({ user })
      res.status(200).json({ user })
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  "/userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { email } = req.query
      const user = await service.findByEmail(email as string)
      console.log({ user })
      const id = { id: user._id }
      console.log(user._id)
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

export default router
