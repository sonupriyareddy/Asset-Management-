import express from "express"
import cors from "cors"
import { dbConnect } from "./configs/db.js"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
import cookieParser from "cookie-parser"
import { assetRouter } from "./routes/assetRouter.js"
const app=express()

//middleware
app.use(express.json()) //json parser
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))     //cross origin allow
app.use(cookieParser()) //it will come in object value insted of string

//routes

//demo
app.get("/",(req,res)=>{
    res.send({message:"Server at work"})
})
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/asset",assetRouter)


//db connection
dbConnect()

app.listen(8080,()=>{
    console.log("server is running on http://localhost:8080")
})
