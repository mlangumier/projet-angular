export type TRole = "ROLE_USER" | "ROLE_ADMIN";

export interface IUserAuth {
  id: number;
  email: string;
  displayName: string;
  role: TRole;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IRegister extends ICredentials {
  displayName: string;
}
