import express from "express"

const unprotectedRouter = express.Router()

unprotectedRouter.get("/", (req, res, next) => {
  try {
    const msg = {
      title: "Ruta desprotegida",
      description:
        "Es una practica para hacer un fetch a una ruta y que se muestre la información mostrada",
      author: "José David Rangel Valdez"
    }
    return res.status(201).json(msg)
  } catch (e) {
    next(e)
  }
})

export default unprotectedRouter
