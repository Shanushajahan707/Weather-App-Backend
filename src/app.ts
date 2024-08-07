import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "./config/config";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

export default app;
