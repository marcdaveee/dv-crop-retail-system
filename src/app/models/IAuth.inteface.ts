export interface ILoginRequest {
  email: string | null;
  password: string | null;
}

export interface ILoginResponse {
  email: string;
  token: string;
}
