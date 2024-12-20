// import moment from "moment";
// import { v4 as uuid } from "uuid";
// import { IDynamicObject } from "../types";

// export const is24HrsPassed = (dateIOS: string): boolean => {
//   const currentDate = new Date().getTime();
//   const timeDifference = Math.abs(currentDate - new Date(dateIOS).getTime()); // Calculate the time difference in milliseconds
//   const twentyFourHoursMS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
//   return timeDifference >= twentyFourHoursMS;
// };

// export const isJsonParseable = (text: string) => {
//   try {
//     JSON.parse(text);
//     return true;
//   } catch (e) {
//     return false;
//   }
// };

// export const createUsernameWithEmail = (email: string) => {
//   return email.replace(/[^a-zA-Z0-9]/g, "_");
// };

// export const getFileExt = (fileName = "") => {
//   let ext = fileName?.split(".");
//   return ext[ext.length - 1]?.toLocaleLowerCase();
// };

// export const getSelectedFields = (
//   object: IDynamicObject | any,
//   fields: string[]
// ) => {
//   const newObject: IDynamicObject = {};
//   fields.forEach((field) => {
//     newObject[field] = object[field];
//   });
//   return newObject;
// };

// export const updateMediaFilename = (file: IDynamicObject) => {
//   return `${file?.filename?.replace(
//     `${APP_NAME.toLocaleLowerCase()}/`,
//     ""
//   )}.${getFileExt(file?.originalname)}`;
// };

// export const getFilename = (folderName: string) => {
//   return `${APP_NAME.toLocaleLowerCase()}/${folderName}/${uuid()}`;
// };

// export function bytesToMBOrKB(bytes: number) {
//   if (bytes < 1000 * 1000) {
//     return `${(bytes / 1000).toFixed(2)} KB`; // Convert to KB
//   }
//   return `${(bytes / (1000 * 1000)).toFixed(2)} MB`; // Convert to MB
// }

// export const calcProgress = (obj: IDynamicObject): number => {
//   const totalFields = Object.keys(obj).length;

//   const filledFields = Object.values(obj).filter(
//     (value) => !["", undefined, null].includes(value)
//   ).length;

//   const progress = totalFields > 0 ? (filledFields / totalFields) * 100 : 0;

//   return Number(Math.round(progress));
// };

// // Calculating agent profile completion progress
// export const calcAgentProgress = (agent: IDynamicObject) => {
//   const selectedFields = getSelectedFields(agent, [
//     "isSmileIdVerified",
//     "licenseNo",
//     "certificationNo",
//     "certificatePdf",
//     "agencyName",
//     "agencySize",
//     "officeName",
//     "address",
//     "website",
//     "facebook",
//     "linkedIn",
//     "agencyEmail",
//     "agencyPhoneNumber",
//   ]);

//   return calcProgress(selectedFields);
// };

// export const emptyKeyForRequiredField = (
//   obj: IDynamicObject,
//   propertyCategory: PropertyCategory
// ) => {
//   const commonFields: Array<keyof IProperty> = [
//     "propertyType",
//     "country",
//     "state",
//     "city",
//     "address",
//     "location",
//     "area",
//     "propertyFor",
//     "price",
//   ];

//   // if (obj?.propertyFor === "sale") {
//   //   commonFields.concat(["price"]);
//   // }

//   if (obj?.propertyFor === "rent") {
//     commonFields.concat(["leaseTerm", "rentPaymentFrequency"]);
//   }

//   // if (obj?.propertyFor === "short-let") {
//   //   commonFields.concat(["shortLetPrice"]);
//   // }

//   if (propertyCategory === PropertyCategory.Residential) {
//     commonFields.concat(["totalArea", "bedrooms", "bathrooms"]);
//   } else if (propertyCategory === PropertyCategory.Commercial) {
//     commonFields.concat(["restrooms"]);
//   }

//   let emptyKey: string = "";
//   commonFields.forEach((key) => {
//     if (!obj[key] || (Array.isArray(obj[key]) && !obj[key]?.length)) {
//       emptyKey = key;
//     }
//   });

//   return emptyKey;
// };

// export const mongoDBProject = (fields: string[], isInclusive: boolean) => {
//   const newObject: IDynamicObject = {};

//   fields.forEach((field) => {
//     if (field) {
//       newObject[field] = isInclusive ? 1 : 0;
//     }
//   });

//   return newObject;
// };

// export const getRecentDate = (filterValue: string) => {
//   const now = moment();

//   if (filterValue === "last-24-hours") {
//     return now.subtract(1, "days").toDate(); // Last 24 hours
//   }

//   if (filterValue === "last-week") {
//     return now.subtract(1, "weeks").toDate(); // Last week
//   }

//   if (filterValue === "last-month") {
//     return now.subtract(1, "months").toDate(); // Last month
//   }

//   if (filterValue === "last-3-months") {
//     return now.subtract(3, "months").toDate(); // Last 3 months
//   }

//   if (filterValue === "last-6-months") {
//     return now.subtract(6, "months").toDate(); // Last 6 months
//   }

//   return null; // Return null if no valid filter is provided
// };

// export const convertToReadableFormat = (str: string) => {
//   return str
//     .replace(/([a-z])([A-Z])/g, "$1 $2")
//     .replace(/^./, str[0]!.toUpperCase());
// };
