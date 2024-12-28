import { Schema, model } from "mongoose";
import { IUser, Role } from "./user.interface";

const schema = new Schema<IUser>(
  {
    user_id: {
      type: Number,
      required: true,
      unique: true,
      validate: {
        validator: function (value: number) {
          return value >= 1 && value <= 99999999999; // Ensures it fits within 11 digits
        },
        message:
          "user_id must be an integer with a maximum length of 11 digits",
      },
    },

    firstName: {
      type: String,
      require: true,
      trim: true,
      minLength: 2,
    },

    lastName: {
      type: String,
      require: true,
      trim: true,
      minLength: 2,
    },

    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    username: {
      type: String,
      trim: true,
      minLength: 2,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: {
        values: Object.values(Role),
        message: "{VALUE} is not supported",
      },
    },

    state: {
      type: String,
      trim: true,
      minLength: 2,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_, ret) {
        delete ret["__v"];
        delete ret["_id"];
        delete ret["id"];
      },
    },
  }
);

export const User = model<IUser>("user", schema);
