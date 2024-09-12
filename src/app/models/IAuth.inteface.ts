export interface ILoginRequest {
  email: string | null;
  password: string | null;
}

export interface ILoginResponse {
  id: string | number;
  email: string;
  token: string;
}
