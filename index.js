import express, { request } from "express";
import { PORT, MONGODBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
//Middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log("app running");
  return response.status(234).send("welcome Ibrahima diallo");
});
app.use("/books", booksRoute);
mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log(`App connected to database`);
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
