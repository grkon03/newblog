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
    created_at: '',
    updated_at: '',
    username: '',
    passhash: '',
  };
}
