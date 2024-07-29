import express from 'express';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //parsing json data in req.body
app.use(express.urlencoded({extended: false})); //parse form data in req.body
//req.body nested objects are also able to be parsed
app.use(cookieParser());

//ROUTES
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})

