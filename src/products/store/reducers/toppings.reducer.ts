import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';
import { Action, createReducer, on } from '@ngrx/store';

// State
export interface ToppingsState {
  entities: { [id: number]: Topping };
  loading: boolean;
  loaded: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loading: false,
  loaded: false,
  selectedToppings: [],
};

// Reducer
const toppingsReducer = createReducer<ToppingsState, Action>(
  initialState,
  on(fromToppings.visualizeToppings, (state: ToppingsState, { payload }) => ({
    ...state,
    selectedToppings: payload,
  })),
  on(fromToppings.loadToppings, (state: ToppingsState) => ({
    ...state,
    loading: true,
  })),
  on(fromToppings.loadToppingsFail, (state: ToppingsState) => ({
    ...state,
    loading: false,
    loaded: false,
  })),
  on(fromToppings.loadToppingsSuccess, (state: ToppingsState, { payload }) => {
    const entities = payload.reduce(
      (entries: { [id: number]: Topping }, topping: Topping) => {
        return {
          ...entries,
          [topping.id]: topping,
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
  state: ToppingsState | undefined,
  action: Action
): ToppingsState {
  return toppingsReducer(state, action);
}

// Selectors
export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
