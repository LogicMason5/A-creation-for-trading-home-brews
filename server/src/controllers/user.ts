import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
const User = require('../models/userSchema');

const userRouter = require('express').Router();


userRouter.post("/register", async (req: Request, res: Response): Promise<void> => {
  const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  await User.create({
    username: req.body.displayName,
    email: req.body.email,
    passwordHash: hashedPassword,
  });

  const token = jwt.sign({ username: req.body.username, scope : req.body.scope }, process.env.SECRET as string);
  res.status(200).send({ token: token });
});


module.exports = userRouter;