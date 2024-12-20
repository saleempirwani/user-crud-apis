import { IDynamicObject, ValidationError } from "../types";

export const errorLogs = (endpoint: any, error: unknown) => {
  console.debug(`ERR [${endpoint}] ====> ${error}`);
};

export const getErrorMsg = (validation: IDynamicObject) => {
  const errors = validation.error.format();
  console.log("🚀 ~ getErrorMsg ~ errors:", errors);

  const keys = Object.keys(errors);
  keys.splice(keys.indexOf("_errors"), 1);
  return keys.length ? errors[keys[0]!]._errors[0] : errors?._errors?.[0];
};

export const zodErrorHandle = (
  fieldName: string,
  errorType: ValidationError
) => {
  return `${fieldName} ${errorType}`;
};
