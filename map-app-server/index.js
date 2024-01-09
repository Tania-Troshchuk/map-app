import "dotenv/config.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import locationRouter from "./routes/locationRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/api/locations", locationRouter);
app.use(errorHandler);

mongoose
  .connect(process.env.mongodbURL)
  .then(() => {
    console.log("Successful connected to mongoDB 🌿");
    app.listen(PORT, () => console.log(`App is listening on port: ${PORT} 🚀`));
  })
  .catch(() => console.log("Can`t connect to mongoDB ❌"));
