// // Import Cloudinary
import { v2 as cloudinary } from "cloudinary";
import { APP_NAME } from "../../app-constants";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryInstance = cloudinary;

// Function to delete a file from Cloudinary
export const deleteFileFromCloudinary = async (
  publicId: string
): Promise<string | null> => {
  const _publicId = publicId?.split(".")[0];

  try {
    const result = await cloudinary.uploader.destroy(
      `${APP_NAME.toLocaleLowerCase()}/${_publicId}`
    );

    return result.result;
  } catch (error) {
    console.error("Error deleting file:", error);
    return null;
  }
};
