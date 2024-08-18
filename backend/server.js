import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import {v2 as cloudinary} from "cloudinary";

dotenv.config();

connectDB();
const app = express();
app.use(express.json({ limit: "50mb" })); // To parse JSON data in the req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body

const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

app.use(express.json()); //parsing json data in req.body
app.use(express.urlencoded({extended: false})); //parse form data in req.body
//req.body nested objects are also able to be parsed
app.use(cookieParser());

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})