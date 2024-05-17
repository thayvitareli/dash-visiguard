export type UserPV = 0 | 1 | 9;

export interface UserProps {
  pv: UserPV;
  name: string;
  email?: string;
  phone: string;
  access_token: string;
  avatar?: string;
}
