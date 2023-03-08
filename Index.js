import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { graphqlHTTP } from "express-graphql";
import schema from "./GraphQl/Schema.js";

const app = express();
dotenv.config();

// process.env.DATABASE_URL)
const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/eigthnotestudios");
    console.log("connected to mongo db");
  } catch (error) {
    console.log(error);
  }
};
//MIDDLEWARES
app.use(cookieParser());
// app.use(express.json());

app.use(
  "/graphql",
  cookieParser(),
  graphqlHTTP((req, res, next) => ({
    schema,
    graphiql: true,
    context: { req, res, next },
  }))
);
// app.use(verifyToken);

mongoose.connection.on("disconnection", () => {
  console.log("disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("connected");
});
app.listen(4000, () => {
  connect();
  console.log("Connected to backend");
});
