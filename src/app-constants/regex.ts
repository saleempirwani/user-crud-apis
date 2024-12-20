export const REGEX = {
  name: /^([a-zA-Z ]){3,}/,
  email:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
  phoneNumber: /^\+?[1-9]\d{1,14}$/,
  allowImgType: /jpeg|jpg|png/,
  allowPdfType: /pdf/,
  digits: /^\d+$/,
  decimals: /^\d*\.?\d+$/,
  alphabets: /^[A-Za-z]+$/,
  alphabetsSpace: /^[A-Za-z ]+$/,
  address: /^[A-Za-z0-9\s.,'-]+$/,
  nigeriaPhone: /^(?:\+234|0)(7|8|9)\d{9}$/,
  linkedIn:
    /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[A-Za-z0-9_-]+\/?$/,
  facebook: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9._-]+\/?$/,
  latitude: /^-?(90(\.0+)?|([0-8]?[0-9](\.[0-9]+)?))$/,
  longitude:
    /^-?(180(\.0+)?|(1[0-7][0-9](\.[0-9]+)?)|([0-9]?[0-9](\.[0-9]+)?))$/,
  text: /^[A-Za-z]+$/,
  objectId: /^[a-fA-F0-9]{24}$/, // MongoDB ObjectId format
  alphanumeric: /^[a-zA-Z0-9 ]+$/,
};

export const checkRegex = (regex: keyof typeof REGEX, text: string) => {
  return text.replace(REGEX[regex], "");
};
