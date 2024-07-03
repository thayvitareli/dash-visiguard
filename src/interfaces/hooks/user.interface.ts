export interface CreateUser {
  CPF: string;
  name: string;
  password: string;
  privilege: number;
}

export interface APIFindMany {
  records: User[]
}

export interface User {
  id: number;
	name: string;
	password:  string;
	CPF: string;
	privilege: number;
	created_at: Date;
	updated_at: Date;
}
