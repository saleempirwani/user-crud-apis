import express from "express";
import { ZodSchema } from "zod";
import {
  updatePropertyComDto,
  updatePropertyResDto,
} from "../../api/property/property.dto";
import { PropertyCategory } from "../../api/property/property.interface";
import { ERRORS } from "../../messages/errors";
import { STATUS } from "../../messages/status-codes";
import { getErrorMsg } from "../../utils/error";

export const validateUpdatePropertyDto = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { propertyCategory } = req.query;
  let schema: ZodSchema = updatePropertyResDto;

  try {
    //   If Property Category is different
    if (
      !Object.values(PropertyCategory).includes(
        propertyCategory as PropertyCategory
      )
    ) {
      throw new Error("Invalid Property Category");
    }

    // If no field is provided
    if (
      !Object.keys(req.body).length &&
      !Object.keys(req.files || {})?.length &&
      !req.file
    ) {
      throw new Error(ERRORS.proReqFields);
    }

    if (propertyCategory === PropertyCategory.Residential)
      schema = updatePropertyResDto;

    if (propertyCategory === PropertyCategory.Commercial)
      schema = updatePropertyComDto;

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
