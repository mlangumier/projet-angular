export type TRole = "ROLE_USER" | "ROLE_ADMIN";

export interface IUser {
  id: number;
  email: string;
  displayName: string;
  role: TRole;
}

export interface IRegister {
  displayName: string;
  email: string;
  password: string;
}