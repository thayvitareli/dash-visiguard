export default interface iCreateCheckIn {
  name: string;
  document: string;
  plate: string;
  type: number;
  suplier_id?: string | number;
  collaborator_id?: string | number;
  visitor_id?: string | number;
}

export interface iCheckFindManyProps {
  from?:any,
  to?:any
}