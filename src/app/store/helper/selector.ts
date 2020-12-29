import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityAdapter } from '@ngrx/entity';

export class Selector {

  constructor(private FEATURE_KEY: string, private adapter: EntityAdapter<any>) {}

  public getEntityState = createFeatureSelector<any>(this.FEATURE_KEY);

  private selectores = this.adapter.getSelectors();

  public selectEntityIds = createSelector(
    this.getEntityState,
    this.selectores.selectIds
  );

  public selectAllEntities = createSelector(
    this.getEntityState,
    this.selectores.selectAll
  );

  public selectEntityCount = createSelector(
    this.getEntityState,
    this.selectores.selectTotal
  );

  public selectEntity = createSelector(
    this.getEntityState,
    (state: any, prop: { id: string }) => state.entities[prop.id]
  );

  public selectEntityLoaded = createSelector(
    this.getEntityState,
    state => state.loaded
  );

  public selectError = createSelector(
    this.getEntityState,
    state => state.error
  );
}

