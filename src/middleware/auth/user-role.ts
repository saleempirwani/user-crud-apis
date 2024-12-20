import express from "express";
import { Role } from "../../api/user/user.interface";
import { ERRORS } from "../../messages/errors";
import { STATUS } from "../../messages/status-codes";

export const userRole = (...roles: Role[]) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      if (!roles.includes(req.user.role)) throw new Error();

      next();
    } catch (error: any | unknown) {
      console.log(error);
      res.status(STATUS.forbidden).send({ message: ERRORS.actionNotAllowed });
    }
  };
};
