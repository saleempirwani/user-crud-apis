import express from "express";
import { Model } from "mongoose";
import { ERRORS } from "../../messages/errors";
import { STATUS } from "../../messages/status-codes";
import { errorLogs } from "../../utils/error";

export const userOwner = (
  model: Model<any>,
  paramIdKey: string,
  docField: string
) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const document = await model
        .findById(req.params?.[paramIdKey])
        .select(docField);

      if (!document) {
        throw new Error("Record does not exist");
      }

      if (req.user?._id.toString() !== document?.[docField]?.toString()) {
        throw new Error("Owner of record does not match");
      }

      next();
    } catch (error: any | unknown) {
      errorLogs("userOwner", error);
      res.status(STATUS.forbidden).send({ message: ERRORS.actionNotAllowed });
    }
  };
};
