import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/mainRouter.js"//mainRouter that does all the routing for the app


dotenv.config();//Middleware of dotenv,  all the environment variables are not usable without this

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); //apply CORS middleware for all routes, meaning all routes in your app will allow cross-origin requests
app.use(express.json());//middleware for body extraction

//api/v1
app.use("/paytin/payments", mainRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});