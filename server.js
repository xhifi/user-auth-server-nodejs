import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";
import spinServer from "./utils/spinServer.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(errorHandler);
app.use(notFound);

spinServer(app);
