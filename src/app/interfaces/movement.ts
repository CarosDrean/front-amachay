export interface Movement {
  _id?: number;
  idProduct: number;
  product?: string;
  idWarehouse: number;
  idUser: number;
  idClient?: number;
  idProvider?: number;
  date: string;
  quantity: number;
  type: string;
}
