import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../../api/user/user.model";
import { Decode } from "../../types";
import { errorLogs } from "../../utils/error";

export const userPartialAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) return next();

    const decode = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET + ""
    ) as Decode;

    if (!decode?._id) return next();

    const user = await User.findById(decode._id);

    if (!user) return next();

    req["user"] = user as any;

    next();
  } catch (error: any | unknown) {
    errorLogs("userPartialAuth", error);
    next();
  }
};
