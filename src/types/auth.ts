import { Ref } from 'vue';
import { ErrorInstance } from './utils';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface UserRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface AuthState {
  user?: User;
  access_token?: string;
  expired_at?: Date;
  loading: boolean;
}

export interface UserResponse {
  data: User;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  expired_at: Date;
  type?: string;
  message?: string;
}

export interface AccessResponse {
  id: string;
  type: string;
  access_token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  remember: boolean;
}

export interface AccessCredentials {
  id: string,
  type: string,
}


export type AuthInstance = {
  [K in keyof AuthState]: Ref<AuthState[K]>
} & {
  error: ErrorInstance['error'];
  login: { (data: LoginCredentials): Promise<unknown> };
  logout: { (): Promise<unknown> };
  register: { (data: UserRegister): Promise<unknown> };
  authenticated: { (): Promise<boolean> };
}
