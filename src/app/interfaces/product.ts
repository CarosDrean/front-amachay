export interface Product {
  _id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  idCategory: number;

  category?: string
  idProductMeasure?: number
  idMeasure?: number
  measure?: string
  unity?: number
  minAlert?: number
  perishable?: boolean
}
