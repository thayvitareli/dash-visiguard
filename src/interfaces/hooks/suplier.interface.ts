export interface CreateSuplier {
  name: string;
  phone: string;
  CNPJ: string;
}

export interface APIFindMany {
  total: number;
  records: Suplier[];
}

export interface Suplier {
  id: number;
  name: string;
  phone: string;
  status: boolean;
  CNPJ: string;
  created_at: string;
  updated_at: string;
}
