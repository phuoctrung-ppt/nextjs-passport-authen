export type UserRegister = {
  readonly id: string;
  username: string;
  email: string;
  salt: string;
  hash: string;
  password?: string;
};

export type UserInfo = {
  readonly id: string;
  username: string;
  email: string;
}