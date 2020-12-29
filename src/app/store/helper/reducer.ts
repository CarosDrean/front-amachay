import { createReducer, on } from '@ngrx/store';
import { EntityAdapter } from '@ngrx/entity';
import { Acciones } from './action';
import { State } from './interface';

export class Reducers {

  constructor(private actions: Acciones, private adapter: EntityAdapter<any>) { }

  public initialState: State = this.adapter.getInitialState({
    loaded: false,
    error: null
  });

  public dreducer = createReducer(
    this.initialState,
    on(this.actions.itemsSuccess, (state, {data}) => {
      return this.adapter.setAll(data, {
        ...state,
        loaded: true
      });
    }),
    on(this.actions.itemsFail, (state, {error}) => {
      return {
        ...state,
        error
      };
    }),
    on(this.actions.itemSuccess, (state, { entity }) => {
      return this.adapter.addOne(entity, state);
    }),
    on(this.actions.itemFail, (state, {error}) => {
      return {
        ...state,
        error
      };
    }),
    on(this.actions.update, (state, { update }) => {
      return this.adapter.updateOne({ id: update._id, changes: update }, state);
    }),
    on(this.actions.updateFail, (state, { error }) => {
      return {
        ...state,
        error
      };
    }),
    on(this.actions.create, (state, action) => {
      return this.adapter.addOne(action.new, state);
    }),
    on(this.actions.createFail, (state, { error }) => {
      return {
        ...state,
        error
      };
    }),
    on(this.actions.deleteA, (state, action) => {
      return this.adapter.removeOne(action.id, state);
    }),
    on(this.actions.deleteFail, (state, { error }) => {
      return {
        ...state,
        error
      };
    }),
  );

}

