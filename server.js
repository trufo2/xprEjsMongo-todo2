import dotenv from "dotenv"
dotenv.config()
import express from "express"
import methodOverride from "method-override"
import cors from "cors"
import morgan from "morgan"
import mongoose from "mongoose"
import MainController from "./controllers/MainController.js"
import APIController from "./controllers/APIController.js"

const PORT = process.env.PORT || 8088
const MONGO_URI = process.env.MONGO_URI
const mainController = new MainController()
const apiController = new APIController()
mongoose.connect(MONGO_URI)
mongoose.connection.on('open', () => console.log('connected'))
.on('close', () => console.log('disconnected'))
.on('error', (er) => console.log(er))
const app = express(MONGO_URI)
const MainRoutes = express.Router()
const APIRoutes = express.Router()
const TodoSchema = new mongoose.Schema({
  message: String,
  completed: Boolean
})
const Todo = mongoose.model("Todo", TodoSchema)

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride("_method"))
app.use("/static", express.static("static"))
app.use(morgan("tiny"))
app.use((req,res,next) => {
  req.models = {
    Todo
  }
  next()
})
app.use("/", MainRoutes)
app.use("/api", APIRoutes)
APIRoutes.use(cors())
MainRoutes.get("/", mainController.index)
MainRoutes.get("/todo/new", mainController.new)
MainRoutes.post("/todo", mainController.create)
MainRoutes.get("/todo/:id", mainController.show)
MainRoutes.put("/todo/complete/:id", mainController.complete)
MainRoutes.delete("/todo/:id", mainController.destroy)
APIRoutes.get("/", apiController.example)
app.listen(PORT, () => console.log(`👂Listening on Port ${PORT}👂`))