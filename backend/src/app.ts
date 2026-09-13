// src/app.ts
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";

const app = express();
app.use(cors());
app.use(express.json());

// Mount auth routes at /auth
app.use("/auth", authRouter);

export default app;
