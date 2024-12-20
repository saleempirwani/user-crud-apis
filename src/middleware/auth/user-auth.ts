import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../../api/user/user.model";
import { ERRORS } from "../../messages/errors";
import { STATUS } from "../../messages/status-codes";
import { Decode } from "../../types";
import { errorLogs } from "../../utils/error";

export const userAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) throw new Error();

    const decode = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET + ""
    ) as Decode;

    const user = await User.findOne({
      _id: decode._id,
    });

    if (!user) throw new Error();

    req["user"] = user as any;
    req["accessToken"] = accessToken;

    next();
  } catch (error: any | unknown) {
    errorLogs("userAuth", error);
    res.status(STATUS.unauthorized).send({ message: ERRORS.unauthorized });
  }
};
