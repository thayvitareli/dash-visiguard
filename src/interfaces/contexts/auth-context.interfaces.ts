import { UserProps } from "../user.interfaces";

export interface AuthContextProps {
  user: UserProps;
  sign: ({ ...props }: SignAuthProps) => Promise<string | undefined>;
  logout: () => void;
  me: () => Promise<boolean>;
}

export interface SignAuthProps {
  cpf: string;
  password: string;
}
