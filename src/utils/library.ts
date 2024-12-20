import { Model } from "mongoose";

export const generateOtpCode = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return "000000" || otp.toString();
};

export const generateUniqueNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateSlug = async (
  model: Model<any>,
  ...field: string[]
): Promise<{ slug: string; slugId: number }> => {
  let foundData: any = await model
    .findOne({})
    .sort({ createdAt: -1 })
    .limit(1)
    .select("slugId");

  const slugId = foundData?.slugId ? foundData?.slugId + 1 : 1;

  let slug: string | string[] = field?.map((text) =>
    text.toLowerCase().replace(/ /g, "-")
  );

  slug = `${slug.join("-")}-${slugId}`;
  return { slug, slugId };
};
