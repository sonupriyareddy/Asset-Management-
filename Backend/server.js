import express from "express";
import cors from "cors";
import { dbConnect } from "./configs/db.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";
import { assetModelRouter } from "./routes/assetModelRoutes.js";
import createSuperAdmin from "./configs/createSuperAdmin.js";
import { assetItemRouter } from "./routes/assetItemRoutes.js";
const app = express();

//middleware
app.use(express.json()); //json parser
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); //cross origin allow
app.use(cookieParser()); //it will come in object value insted of string

//routes

//demo
app.get("/", (req, res) => {
  res.send({ message: "Server at work" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/asset-model", assetModelRouter);
app.use("/api/v1/asset-item", assetItemRouter);

//db connection
//dbConnect()

app.listen(8080, async () => {
  console.log("server is running on http://localhost:8080");
  //db connection
  await dbConnect();
  //superAdmin
  await createSuperAdmin();
});
