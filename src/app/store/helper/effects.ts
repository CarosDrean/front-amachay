import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Service } from '../../api/service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Acciones } from './action';
import { undo } from 'ngrx-undo';

export class Effects {

  constructor(private actions: Actions,
              private service: Service,
              private actionE: Acciones) {}

  public loadEntities = createEffect(() => {
    return this.actions.pipe(
      ofType(this.actionE.items),
      switchMap(() => {
          return this.service.getItems().pipe(
            map((res: any) => {
              console.log(res);
              return this.actionE.itemsSuccess({
                data: res
              });
            }),
            catchError(error => {
                console.log(error);
                return of(
                  this.actionE.itemsFail({
                    error
                  })
                );
              }
            )
          );
        }
      )
    );
  });

  public loadEntity = createEffect(() =>
    this.actions.pipe(
      ofType(this.actionE.item),
      switchMap(({ id }) => {
          return this.service.getItem(id).pipe(
            map((res: any) => {
              // console.log(res);
              return this.actionE.itemSuccess({
                entity: res
              });
            }),
            catchError(error => {
              console.log(error);
              return of(
                this.actionE.itemFail({
                  error
                })
              );
            })
          );
        }
      )
    )
  );

}
