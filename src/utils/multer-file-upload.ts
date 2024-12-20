import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v4 as uuid } from "uuid";
import { APP_NAME, BYTE_1_MB } from "../app-constants";
import { REGEX } from "../app-constants/regex";
import { ERRORS } from "../messages/errors";
import { cloudinaryInstance } from "../services/cloudinary";
import { getFileExt, getFilename } from "./helper";

/*********** User File Upload **************/
const userStorage = new CloudinaryStorage({
  cloudinary: cloudinaryInstance,
  params: {
    format: async (req: any, file: any) => getFileExt(file.originalname),
    public_id: () => {
      return `${APP_NAME.toLocaleLowerCase()}/users/${uuid()}`;
    },
  } as any,
});

// const fileFilterForImages = (req: any, file: any, cb: any) => {
//   const extname = REGEX.allowImgType.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = REGEX.allowImgType.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error(ERRORS.allowImgType));
//   }
// };

export const userUpload = multer({
  storage: userStorage,
  // fileFilter: fileFilterForImages,
  // limits: { fileSize: BYTE_1_MB * 2 },
});

export const userFileUpload = userUpload.fields([
  { name: "photo", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 },
]);

/*********** Agent File Upload **************/
const agentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    format: async (req: any, file: any) => getFileExt(file.originalname),
    public_id: () => {
      return getFilename("agents");
    },
  } as any,
});

const agentFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const extname = REGEX.allowPdfType.test(getFileExt(file.originalname)!);
  const mimetype = REGEX.allowPdfType.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    callback(new Error(ERRORS.allowPdfType));
  }
};

export const agentUpload = multer({
  fileFilter: agentFilter,
  limits: { fileSize: BYTE_1_MB * 3 },
  storage: agentStorage,
});

export const agentFileUpload = agentUpload.fields([
  { name: "certificatePdf", maxCount: 1 },
]);

/*********** Property Media Upload **************/
const propertyStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    format: async (req: any, file: any) => getFileExt(file.originalname),
    public_id: () => {
      return getFilename("properties");
    },
  } as any,
});

const propertyFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  const extname = REGEX.allowImgType.test(getFileExt(file.originalname)!);
  const mimetype = REGEX.allowImgType.test(file.mimetype);

  if (extname && mimetype) {
    return callback(null, true);
  } else {
    callback(new Error(ERRORS.allowPdfType));
  }
};

export const propertyUpload = multer({
  fileFilter: propertyFilter,
  limits: { fileSize: BYTE_1_MB * 3 },
  storage: propertyStorage,
});

export const propertyMediaUpload = propertyUpload.fields([
  { name: "photos", maxCount: 5 },
  { name: "floorPlan", maxCount: 1 },
]);
