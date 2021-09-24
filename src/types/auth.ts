export interface AuthState {
  isAuth: boolean;
  token: string | null;
  expirationTime: number | null;
}

export interface PayloadToAuthState {
  jwtToken: string;
  expTime: number;
}
export interface AuthPayload {
  payload: PayloadToAuthState;
}
