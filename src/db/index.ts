import mongoose, { ConnectOptions } from "mongoose";
import { DB_NAME, MONGODB_URI } from "../app-constants/env-variables";

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    isConnected = true;

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

connectToDB();
