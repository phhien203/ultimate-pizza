import * as fromPizzas from './pizzas.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { PizzaState } from './pizzas.reducer';

export const featureKey = 'products';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
};

export const getProductsState = createFeatureSelector<ProductsState>(
  featureKey
);

export const getPizzaState = createSelector(
  getProductsState,
  (state: ProductsState) => state.pizzas
);

export const getPizzaEntities = createSelector(
  getPizzaState,
  (state: PizzaState) => state.entities
);

export const getAllPizzas = createSelector(getPizzaEntities, (entities) => {
  return Object.keys(entities).map((id) => entities[id]);
});

export const getPizzaLoading = createSelector(
  getPizzaState,
  (state: fromPizzas.PizzaState) => state.loading
);

export const getPizzaLoaded = createSelector(
  getPizzaState,
  (state: fromPizzas.PizzaState) => state.loaded
);
