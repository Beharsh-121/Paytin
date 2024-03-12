import Express from "express";
import bcrypt from "bcrypt";
import zod from "zod";
import { User, Account, Transaction } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = Express.Router();
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

userRouter.get("/me", authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(403).json({
      msg: "Not logged In",
    });
  }

  const userDetails = await User.findById(userId);
  const accountDetails = await Account.findOne({
    userId: userId,
  });
  res.json({
    user: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      username: userDetails.username,
    },
    account: {
      balance: accountDetails.balance,
    },
  });
});

userRouter.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!success) {
    return res.json({
      message: "Incorrect inputs zod validation fail",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/User exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;
  // Create new account
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User Created Successfully",
    token: token,
    username: req.body.username,
  });
});

const signinBody = zod.object({
  email: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.email,
    // password: req.body.password
  });

  if (user) {
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validatePassword) {
      res.status(400).json({
        message: "invalid password",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
      username: user.firstName,
    });

    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.put("/", async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
    new: true,
  });

  if (!updatedUser) {
    res.status(411).json({
      message: "User Not found",
    });
    return;
  }
  res.json({
    message: "Updated Successfully",
    updatedUser,
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

userRouter.get("/transactions", authMiddleware, async(req, res) => {
  const id = req.userId;
  try{
    const allTransactions = await Transaction.find({userId: id});
    return res.json(allTransactions);
  }catch(e){
    console.error(e);
  }
})

export default userRouter;
