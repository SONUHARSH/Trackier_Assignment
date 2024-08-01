
import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import bodyParser from "body-parser"
import session from "express-session"



dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes Import 
import userRouter from './routes/userRoutes.js'


//routes declaration
app.use("/api/users", userRouter);


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8087, () => {
        console.log(` Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

export { app }
