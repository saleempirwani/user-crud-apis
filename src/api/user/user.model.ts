import { Schema, model } from "mongoose";
import { IUser, Role } from "./user.interface";

const schema = new Schema<IUser>(
  {
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
      },
    },
  }
);

export const User = model<IUser>("user", schema);
