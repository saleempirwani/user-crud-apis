import express from "express";
import { ERRORS } from "../../messages/errors";
import { STATUS } from "../../messages/status-codes";
import { ZodSchema } from "zod";
import { getErrorMsg } from "../../utils/error";

export const validateDto = (schema: ZodSchema) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(req.body);

    try {
      if (
        !Object.keys(req.body).length &&
        !Object.keys(req.files || {})?.length &&
        !req.file
      ) {
        throw new Error(ERRORS.proReqFields);
      }

      const validation = schema.safeParse(req.body);

      if (!validation.success) {
        throw new Error(getErrorMsg(validation));
      }

      next();
    } catch (error: any | unknown) {
      console.log(error);
      res.status(STATUS.badRequest).send({ message: error.message });
    }
  };
};
