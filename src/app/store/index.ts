import { Params } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { searchReducer, SEARCH } from './search/search.reducer';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { InjectionToken } from '@angular/core';
import {MOVEMENT, movementReducer} from './movement/movement.reducer';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

function resetState(reducer): any {
  return (state, action) => {
    return reducer(state, action);
  };
}

const reducers: ActionReducerMap<any> = {
  router: fromRouter.routerReducer,
  [SEARCH]: searchReducer,
  [MOVEMENT]: movementReducer,
};

const metaReducers: MetaReducer<any>[] = !environment.production
  ? [resetState]
  : [resetState];

export const getMetaReducers = (): MetaReducer<any>[] => metaReducers;

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>(
  'Registered Reducers',
  {
    factory: () => reducers
  }
);

export const appEffects = [];

