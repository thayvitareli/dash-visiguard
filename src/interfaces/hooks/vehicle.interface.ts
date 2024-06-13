import { APIFindMany } from "./collaborator.interface";
export interface CreateVehicle {
  plate: string;
  type: number;
  brand: string;
  model: string;
}

export interface APIFindMany {
  total: number;
  records: Record[];
}

export interface Record {
  id: number;
  plate: string;
  type: number;
  brand: string;
  model: string;
  created_at: string;
  updated_at: string;
}
