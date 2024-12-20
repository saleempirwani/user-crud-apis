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

// Generate access token for validate user
// schema.method("generateAccessToken", async function () {
//   const user = this;
//   const accessToken: string = jwt.sign({ _id: user._id }, ACCESS_TOKEN_SECRET, {
//     expiresIn: ACCESS_TOKEN_EXPIRY,
//   });

//   return accessToken;
// });

// // Generate & send verification link for Verify Email & Reset Password
// schema.method("genAndSendOTP", async function (type: OtpType) {
//   const user = this;

//   const code = generateOtpCode();

//   user.otpType = type;
//   user.otpCode = encrypt(code, OTP_SECRET, false);
//   user.otpExpiry = moment()
//     .add(OTP_EXPIRY.amount, OTP_EXPIRY.unit)
//     .toISOString();

//   const promises = [
//     user.save(),
//     // sendOTPEmail({
//     //   recipientEmail: user.email,
//     //   recipientName: `${user.firstName} ${user.lastName}`,
//     //   code,
//     //   type,
//     // }),
//   ];

//   await Promise.all(promises);
// });

// schema.static(
//   "findByCredentials",
//   async function findByCredentials(email, password) {
//     let user = await User.findOne({ email });

//     if (!user) return { user: null, token: { accessToken: null } };

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return { user: null, token: { accessToken: null } };

//     if (user.isEmailVerified === true && user.isBlocked === false) {
//       const [accessTokenResp, agentResp] = await Promise.allSettled([
//         user.generateAccessToken(),
//         Agent.findOne({ owner: user._id }).select("progress status"),
//       ]);

//       return {
//         user: {
//           ...user.toJSON(),
//           agent: agentResp.status === "fulfilled" ? agentResp.value : null,
//         },
//         token: {
//           accessToken:
//             accessTokenResp.status === "fulfilled" ? accessTokenResp.value : "",
//         },
//       };
//     }

//     if (user.isEmailVerified === false) {
//       await user.genAndSendOTP(OtpType.REGISTRATION);
//     }

//     return { user, token: { accessToken: null } };
//   }
// );

// schema.pre("save", async function (next) {
//   const user = this;

//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(
//       user.password,
//       Number(process.env.BCRYPT_ROUNDS)
//     );
//   }

//   next();
// });

export const User = model<IUser>("user", schema);

// export const getUserByEmail = (email: string) =>
//   User.findOne({ email })
//     .then((user) => user)
//     .catch(() => {});

// export const getUserByField = (field: { [x: string]: any }) => {
//   return User.findOne(field)
//     .then((user) => user)
//     .catch(() => {});
// };

// export const getUsers = () => User.find();
// export const getUserById = async (id: string) => User.findOne({ _id: id });
// export const deleteUserById = (id: mongoose.Types.ObjectId) =>
//   User.findByIdAndDelete(id);
// export const updateUserById = (id: string, values: Record<string, any>) =>
//   User.findByIdAndUpdate(id, values);
