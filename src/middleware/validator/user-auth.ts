import express from "express";
import { API_KEY } from "../../app-constants";
import { STATUS } from "../../messages/status-codes";
import { errorLogs } from "../../utils/error";

export const userAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const apiKey = req.header("Authorization");

    if (apiKey !== API_KEY) throw new Error();

    next();
  } catch (error: any | unknown) {
    errorLogs("userAuth", error);
    res.status(STATUS.unauthorized).send({ message: "Invalid API Key" });
  }
};
