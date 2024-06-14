import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/mongoose.config.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.json());

app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.clear();
  console.log("Server up and running on port: " + process.env.PORT);
  connectDB();
});
