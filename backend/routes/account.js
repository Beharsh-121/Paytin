import mongoose from "mongoose";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { User, Account, Transaction } from "../db.js";

const accountRouter = express.Router();

accountRouter.post("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  if (account) {
    res.json({
      balance: account.balance,
    });
    return;
  } else {
    res.status(404).json({
      message: "User not found! Wrong Inputs",
    });
    return;
  }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const amount = req.body.amount;
  const senderId = req.userId;
  const senderAccountId = await Account.findOne({ userId: senderId });

  if (!senderAccountId || senderAccountId.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance or the User Does'nt exist",
    });
  }

  const receiverEmailId = req.body.to;
  const receiverUserId = await User.findOne({ _id: receiverEmailId });

  if (!receiverUserId) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Wrong receiver id",
    });
  }

  await Account.updateOne(
    { _id: senderAccountId._id },
    { $inc: { balance: -amount } },
    { session: session }
  ).session(session);

  //Crediting Balance to the Receiver

  const receiverAccountId = await Account.findOne({ userId: receiverUserId });

  await Account.updateOne(
    { _id: receiverAccountId._id },
    { $inc: { balance: amount } },
    { session: session }
  ).session(session);

  await Transaction.create({
    userId: req.userId,
    to: receiverUserId.username,
    amount: req.body.amount,
  });
  // const updatedSenderAccount = await Account.findOne({userId: senderId});
  // const updatedRecieverAccount = await Account.findOne({userId: receiverUserId});
  await session.commitTransaction();

  return res.json({
    message: "Transaction is completed Successfully",
  });
});

export default accountRouter;
