export interface Movement {
  _id?: number;
  idProduct: number;
  product?: string;
  measure?: string
  idWarehouse: number;
  idUser: number;
  idClient?: number;
  idProvider?: number;
  date: string;
  quantity: number;
  type: string;

  invoice?: string
  lot?: string
  dueDate?: string
  state?: boolean
  perishable?: boolean
  dayDue?: number
}
