import express from "express";
import { STATUS } from "../../messages/status-codes";
import { errorLogs } from "../../utils/error";

export const fileUpload = (upload: any) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    upload(req, res, function (err: Error) {
      try {
        if (err) throw new Error(err?.message);

        next();
      } catch (error: unknown | any) {
        errorLogs("fileUpload", error);
        res.status(STATUS.badRequest).send({ message: error?.message });
      }
    });
  };
};
