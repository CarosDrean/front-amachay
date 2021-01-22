export interface Product {
  _id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: number;

  idProductMeasure?: number
  idMeasure?: number
  measure?: string
  unity?: number
  minAlert?: number
}
