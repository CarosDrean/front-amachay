import { Action } from '@ngrx/store';

export const MOVEMENT = 'MOVEMENT';

export class MovementAction implements Action {
  readonly type = MOVEMENT;

  constructor(public payload: string) { }
}

export type actions = MovementAction;

export function movementReducer(state: string = '', action: actions): any{
  switch (action.type) {
    case MOVEMENT:
      return action.payload;
  }
}
