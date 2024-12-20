export enum Role {
  Business = "business",
  Consultant = "consultant",
  Patron = "patron",
  Admin = "admin",
}

export interface IUser {
  role: Role;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  state: string;
}

// export interface IUserMethods {
//   generateAccessToken(): Promise<{
//     accessToken: string;
//   }>;

//   genAndSendOTP(type: OtpType): Promise<void>;
// }

// export interface IUserModel extends Model<IUser, {}, IUserMethods> {
//   findByCredentials(
//     email: string,
//     password: string
//   ): Promise<{
//     user: IUser;
//     token: { accessToken: string | null };
//   }>;
// }
