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
