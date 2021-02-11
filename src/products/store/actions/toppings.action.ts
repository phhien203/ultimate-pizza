import { createAction, props } from '@ngrx/store';
import { Topping } from '../../models/topping.model';

export const loadToppings = createAction('[Products] Load toppings');

export const loadToppingsFail = createAction(
  '[Products] Load toppings fail',
  props<{ payload: any }>()
);

export const loadToppingsSuccess = createAction(
  '[Products] Load toppings success',
  props<{ payload: Topping[] }>()
);

export const visualizeToppings = createAction(
  '[Products] Visualize toppings',
  props<{ payload: number[] }>()
);
