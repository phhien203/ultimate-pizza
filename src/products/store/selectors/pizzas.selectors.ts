import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import { Pizza } from '../../models/pizza.model';
import { getSelectedToppings, getToppingsEntities } from './toppings.selectors';

export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getPizzaEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

export const getSelectedPizza = createSelector(
  getPizzaEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getVisualizedPizza = createSelector(
  getSelectedPizza,
  getToppingsEntities,
  getSelectedToppings,
  (pizza, entities, selectedToppings) => ({
    ...pizza,
    toppings: selectedToppings.map((id) => entities[id]),
  })
);

export const getAllPizzas = createSelector(getPizzaEntities, (entities) => {
  return Object.keys(entities).map((id) => entities[id]);
});

export const getPizzaLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);

export const getPizzaLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);
