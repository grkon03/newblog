import Result from './result';
import { API } from './api';

export type User = {
  id: number;
  created_at: string;
  updated_at: string;
  username: string;
  passhash: string;
};

export function NewUserTemplate(): User {
  return {
    id: 0,
    created_at: '2006-01-02T15:04:05+09:00',
    updated_at: '2006-01-02T15:04:05+09:00',
    username: '',
    passhash: '',
  };
}

export type LoginRequest = {
  username: string;
  password: string;
};
type LoginResponse = {
  token: string;
  user: User;
};

export async function Login(req: LoginRequest): Promise<Result<LoginResponse>> {
  const res = await API.POST<LoginResponse>('/login', req);

  return res;
}

export function LoginUser(): User | null {
  var dt = localStorage.getItem('user');
  if (dt === null) return null;
  const user: User = JSON.parse(dt);
  return user;
}
