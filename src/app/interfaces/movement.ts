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

  idLot?: number
  lot?: string
  dueDate?: string
  idBrand?: number
  brand?: string
  perishable?: boolean
  dayDue?: number
}
