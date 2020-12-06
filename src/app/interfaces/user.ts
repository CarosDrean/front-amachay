export interface User {
  _id?: string;
  username: string;
  password: string;
  role: string;
  idPerson?: number;
  name: string;
  lastName: string;
  cel: string;
  phone: string;
  address: string;
  dni: string;
  mail: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
