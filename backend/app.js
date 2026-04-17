import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT;

// ROUTES

app.use("/api/auth", authRoutes);

connectDb().then((res) => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
});
