import express from "express";
const mainRouter = express.Router();
import userRouter from "./user.js"
import accountRouter from "./account.js"


mainRouter.use("/user", userRouter);
mainRouter.use("/account", accountRouter);

export default mainRouter;