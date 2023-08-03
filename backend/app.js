import { MongoClient } from "mongodb";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
import path from 'path';
import { fileURLToPath, URL } from 'url';

import bookRouter from "./routes/bookRouter.js";
import userRouter from "./routes/userRouter.js";



app.use(cors());
app.use(express.json());

let db = null;
let client = new MongoClient(process.env.DB_CONNECTION_URI);

(async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DATABASE_NAME);
    console.log("DB connected...");
  } catch (error) {
    console.log("DB connection error....");
  }
})();

app.listen(3000, () => {
  console.log("connected on 3000...");
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/pic', express.static(path.join(fileURLToPath(new URL('.', import.meta.url)), 'uploads')))



app.use("/users", userRouter);
app.use("/books", bookRouter);

app.use((req, res) => {
  res.status(404).send("API not supported...");
});

app.use((error, req, res) => {
  if (error.message) {
    res.send(error.message);
  } else {
    res.send("Backend error...");
  }
});
