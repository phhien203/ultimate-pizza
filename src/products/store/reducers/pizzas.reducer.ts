import { Pizza } from '../../models/pizza.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as PizzaAction from '../actions/pizzas.action';

// State
export interface PizzaState {
  entities: { [id: number]: Pizza };
  loading: boolean;
  loaded: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loading: false,
  loaded: false,
};

// Reducer
const pizzaReducer = createReducer<PizzaState, Action>(
  initialState,
  on(PizzaAction.loadPizzas, (state) => ({ ...state, loading: true })),
  on(PizzaAction.loadPizzasSuccess, (state, { payload }) => {
    const entities = payload.reduce(
      (entries: { [id: number]: Pizza }, pizza: Pizza) => {
        return {
          ...entries,
          [pizza.id]: pizza,
        };
      },
      { ...state.entities }
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      entities,
    };
  })
);

export function reducer(
  state: PizzaState | undefined,
  action: Action
): PizzaState {
  return pizzaReducer(state, action);
}
