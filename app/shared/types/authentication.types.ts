export interface AuthenticationParams {
  username: string;
  password: string;
}

export interface ChangeEmailParams {
  email: string;
}

export interface RefreshTokenParams {
  authorization: string;
  resetCode: string;
  password: string;
}

