import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"//for get db url from .env
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();//loads .env file contents into process.env

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());// for problem doesnt exist in requests


app.get("/", (req, res) => { //main page
    res.json({
        author: "Akin Software",
        message: "Full stack blog",
    })
});
app.use("/posts", postRoutes);
app.use("/user", userRoutes)


//const CONNECTION_URL="mongodb+srv://akin:akin@cluster0.s2ujq.mongodb.net/?retryWrites=true&w=majority"



mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,//to avoid error
        useUnifiedTopology: true//to avoid error
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Server is Running on port : ${PORT} " + process.env.PORT);
        });

    })
    .catch((error) => {
        console.error(error.message);
    })