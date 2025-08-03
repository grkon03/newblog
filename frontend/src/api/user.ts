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

export async function Login(req: LoginRequest): Promise<boolean> {
  type LoginResponse = {
    token: string;
    user: User;
  };

  const [res, status] = await API.POST<LoginResponse>('/login', req);

  if (API.IsOK(status)) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  return API.IsOK(status);
}

export function LoginUser(): User | null {
  var dt = localStorage.getItem('user');
  if (dt === null) return null;
  const user: User = JSON.parse(dt);
  return user;
}
