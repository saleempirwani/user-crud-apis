import { JwtPayload } from "jsonwebtoken";
import moment from "moment";
import { HydratedDocument, ObjectId } from "mongoose";
import { IUser, IUserMethods, IUserModel } from "../api/user/user.interface";
import { IChat } from "../api/chat/chat.interface";
import { IRoom } from "../api/room/room.interface";

// Library Types Manipulation
export type Decode = { _id: ObjectId } & JwtPayload;

declare global {
  namespace Express {
    interface Request {
      user: HydratedDocument<IUser, IUserModel, IUserMethods>;
      accessToken: string;
    }
  }
}

// App Types

export interface IDynamicObject {
  [x: string]: any;
}

export interface OtpExpiry {
  amount: number;
  unit: moment.unitOfTime.DurationConstructor;
}

export interface IMessage {
  room: IRoom;
  chat: IChat;
}

export type ValidationError =
  | "is required"
  | "are required"
  | "format is invalid"
  | "is invalid"
  | "must be a string"
  | "must be a boolean"
  | "must contain at least 2 letters"
  | "must contain at least 5 letters"
  | "must contain at least 2 characters"
  | "must contain at least 8 characters"
  | "must contain at least 10 characters"
  | "must contain upto 20 letters"
  | "must contain upto 30 letters"
  | "must contain upto 200 letters"
  | "must contain upto 20 characters"
  | "must contain upto 50 characters"
  | "must contain upto 30 characters"
  | "must contain upto 50 characters"
  | "must contain upto 200 characters"
  | "must contain upto 800 characters"
  | "must contain upto 100 letter, characters"
  | "must contain letters, numbers, spaces, and common punctuation (.,'-)"
  | "must contain 6 digits"
  | "must contain 4 digits"
  | "must contain upto 40 digits"
  | "must be a number"
  | "must contain only letters"
  | "must contain only letters and spaces"
  | "min limit is 1"
  | "max. limit is 100"
  | "max. limit is 300"
  | "max. limit is 500"
  | "max. limit is 3"
  | "cannot be empty"
  | "cannot be in the future"
  | "must be after 1900"
  | "must be a positive number"
  | "must be at least 1"
  | "Please provide only allowed fields."
  | "must be today or a future date"
  | "must be a valid date"
  | "must be future date"
  | "must be an array of numbers"
  | "must contain exactly two values (latitude and longitude)"
  | "must be a valid";
