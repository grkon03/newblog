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
