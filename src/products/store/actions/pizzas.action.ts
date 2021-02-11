import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

// load pizzas
export const loadPizzas = createAction('[Products] Load Pizzas');

export const loadPizzasFail = createAction(
  '[Products] Load Pizzas Fail',
  props<{ payload: any }>()
);

export const loadPizzasSuccess = createAction(
  '[Products] Load Pizzas Success',
  props<{ payload: Pizza[] }>()
);

// create pizza
export const createPizza = createAction(
  '[Products] Create pizza',
  props<{ payload: Pizza }>()
);

export const createPizzaFail = createAction(
  '[Products] Create pizza fail',
  props<{ payload: any }>()
);

export const createPizzaSuccess = createAction(
  '[Products] Create pizza success',
  props<{ payload: Pizza }>()
);

// update pizza
export const updatePizza = createAction(
  '[Products] Update pizza',
  props<{ payload: Pizza }>()
);

export const updatePizzaFail = createAction(
  '[Products] Update pizza fail',
  props<{ payload: any }>()
);

export const updatePizzaSuccess = createAction(
  '[Products] Update pizza success',
  props<{ payload: Pizza }>()
);

// remove pizza
export const removePizza = createAction(
  '[Products] Remove pizza',
  props<{ payload: Pizza }>()
);

export const removePizzaFail = createAction(
  '[Products] Remove pizza fail',
  props<{ payload: any }>()
);

export const removePizzaSuccess = createAction(
  '[Products] Remove pizza success',
  props<{ payload: Pizza }>()
);
