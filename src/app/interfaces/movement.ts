export interface Movement {
  _id?: number;
  idProduct: number;
  idWarehouse: number;
  idUser: number;
  idClient?: number;
  date: string;
  quantity: number;
  type: string;
}
