import { EntityState } from '@ngrx/entity';

export interface EntityTypes {
  items: string;
  itemsSuccess: string;
  itemsFail: string;
  item: string;
  itemSuccess: string;
  itemFail: string;
  create: string;
  createSuccess: string;
  createFail: string;
  update: string;
  updateSuccess: string;
  updateFail: string;
  deleteA: string;
  deleteSuccess: string;
  deleteFail: string;
}

export interface State extends EntityState<any> {
  loaded: boolean;
  error?: Error | any;
}
