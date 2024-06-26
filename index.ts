import express from 'express'
import type { Request, Response, NextFunction } from "express"
import cookieParser from "cookie-parser"
import { connectToDB } from './app/config/db'
import ErrorHandler from "./app/middlewares/ErrorHandler"
import { HttpException } from "./app/utils/HttpExceptions"
import { AppRoutes } from "./app/routes/AppRoutes"

const port = process.env.API_PORT || 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', AppRoutes)

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpException(404, "Route not found"))
})

app.use(ErrorHandler)

const initializeApp = async () => {
  try {
     app.listen(port, () => {
      console.log(`[SERVER]: Servidor disponivel em http://127.0.0.1:${port}/api`)
     })
     await connectToDB()
   } catch (err) {
     console.error(err)
     process.exit(1)
   } 
  }

initializeApp()