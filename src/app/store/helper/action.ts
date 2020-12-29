import { createAction, props } from '@ngrx/store';
import { EntityTypes } from './interface';

export class Acciones {

  constructor(private actions: EntityTypes) {
  }

  public items = createAction(this.actions.items);

  public itemsSuccess = createAction(
    this.actions.itemsSuccess,
    props<{ data: any[] }>()
  );

  public itemsFail = createAction(
    this.actions.itemsFail,
    props<{ error: Error | any }>()
  );

  public item = createAction(
    this.actions.item,
    props<{ id: string }>()
  );

  public itemSuccess = createAction(
    this.actions.itemSuccess,
    props<{ entity: any }>()
  );

  public itemFail = createAction(
    this.actions.itemFail,
    props<{ error: Error | any }>()
  );

  public update = createAction(
    this.actions.update,
    props<{ update: any }>()
  );

  public updateSuccess = createAction(
    this.actions.updateSuccess,
    props<{ entity: any }>()
  );

  public updateFail = createAction(
    this.actions.updateFail,
    props<{ error: Error | any }>()
  );

  public create = createAction(
    this.actions.create,
    props<{ new: any }>()
  );

  public createSuccess = createAction(
    this.actions.createSuccess,
    props<{ entity: any }>()
  );

  public createFail = createAction(
    this.actions.createFail,
    props<{ error: Error | any }>()
  );

  public deleteA = createAction(
    this.actions.deleteA,
    props<{ id: string }>()
  );

  public deleteSuccess = createAction(
    this.actions.deleteSuccess
  );

  public deleteFail = createAction(
    this.actions.deleteFail,
    props<{ error: Error | any }>()
  );
}

