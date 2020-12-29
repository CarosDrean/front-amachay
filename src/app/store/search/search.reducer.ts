import { Action } from '@ngrx/store';

export const SEARCH = 'SEARCH';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}

export type actions = SearchAction;

export function searchReducer(state: string = '', action: actions): any{
  switch (action.type) {
    case SEARCH:
      return action.payload;
  }
}
