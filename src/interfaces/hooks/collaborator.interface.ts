export interface CreateCollaborator {
  name: string;
  register_employee: string;
  position: number;
  departament: number;
}

export interface APIFindMany {
  total: number;
  record: Record[];
}

export interface Record {
  id: number;
  name: string;
  register_employ: string;
  position: number;
  department: number;
  created_at: string;
  updated_at: string;
}
