import { Pizza } from '../../models/pizza.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromPizza from '../actions/pizzas.action';

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
const pizzasReducer = createReducer<PizzaState, Action>(
  initialState,
  on(fromPizza.loadPizzas, (state: PizzaState) => ({
    ...state,
    loading: true,
  })),
  on(fromPizza.loadPizzasFail, (state: PizzaState) => ({
    ...state,
    loading: false,
    loaded: false,
  })),
  on(fromPizza.loadPizzasSuccess, (state: PizzaState, { payload }) => {
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
  }),
  on(
    fromPizza.createPizzaSuccess,
    fromPizza.updatePizzaSuccess,
    (state: PizzaState, { payload }) => ({
      ...state,
      entities: {
        ...state.entities,
        [payload.id]: payload,
      },
    })
  ),
  on(fromPizza.removePizzaSuccess, (state: PizzaState, { payload }) => {
    const { [payload.id]: removed, ...entities } = state.entities;
    return {
      ...state,
      entities,
    };
  })
);

export function reducer(
  state: PizzaState | undefined,
  action: Action
): PizzaState {
  return pizzasReducer(state, action);
}
