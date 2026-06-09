export interface RegisterRequest { name: string; email: string; password: string; }
export interface LoginRequest { email: string; password: string; }

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  emailVerified?: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  role: string;
  emailVerified: boolean;
  user?: User;
}
