export interface CreateVisitor {
  name: string;
  phone: string;
  rg: string;
}

export interface APIFindMany {
  total: number;
  records: Visitor[];
}

export interface Visitor {
  id: number;
  name: string;
  phone: string;
  rg: string;
  created_at: string;
  updated_at: string;
}
