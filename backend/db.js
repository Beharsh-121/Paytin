import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); //Middleware of dotenv,  all the environment variables are not usable without this
const mongoUrl = process.env.MONGO_URL; //To access the specific environment variables

mongoose.connect(mongoUrl).then((r) => console.log("database is connected"));

//schema for users table
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

//schema for account tables
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

//schema for Transaction table
const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", userSchema);
const Transaction = mongoose.model("Transaction", transactionSchema);

export { User, Account, Transaction };
