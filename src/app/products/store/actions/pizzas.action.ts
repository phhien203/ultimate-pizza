import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';

export const loadPizzas = createAction('[Products] Load Pizzas');

export const loadPizzasFail = createAction(
  '[Products] Load Pizzas Fail',
  props<{ payload: any }>()
);

export const loadPizzasSuccess = createAction(
  '[Products] Load Pizzas Success',
  props<{ payload: Pizza[] }>()
);
