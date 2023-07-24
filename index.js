import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import router from "./routes/index.js";
import cors from "cors";

//IMPORT MODELS
//GENERATE TABLE USERS
//import Users from "./models/UserModel.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database is now connected!");
  //FUNCTION TO GENERATE USERS TABLE
  //  await Users.sync();
} catch (error) {
  console.error(error);
}

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(router);
const port = 5000;
app.listen(port, () => {
  console.log(`server running at port: ${port}`);
});

//30:22
