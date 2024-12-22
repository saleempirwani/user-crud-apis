import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://saleem_dev:FECBSnhiAADv6y50@clusterforlearning.hqjxsri.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "user-crud-api",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    isConnected = true;

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

connectToDB();
