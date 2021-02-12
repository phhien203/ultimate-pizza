import * as fromPizzas from './pizzas.reducer';
import * as fromActions from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

describe('Pizzas Reducer', () => {
  describe('undefined action', () => {
    it('should return default state', () => {
      const { initialState } = fromPizzas;
      const action = {} as any;

      const state = fromPizzas.reducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('loadPizzas action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromPizzas;
      const action = fromActions.loadPizzas();

      const state = fromPizzas.reducer(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });

  describe('loadPizzasSuccess action', () => {
    it('should map an array to entities', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] }
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1],
      };
      const { initialState } = fromPizzas;
      const action = fromActions.loadPizzasSuccess({ payload: pizzas });

      const state = fromPizzas.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });

  describe('PizzasReducer Selectors', () => {
    describe('getPizzasEntities', () => {
      it('should return .entities', () => {
        const entities: { [key: number]: Pizza } = {
          1: { id: 1, name: 'Pizza #1', toppings: [] },
          2: { id: 2, name: 'Pizza #2', toppings: [] },
        };
        const { initialState } = fromPizzas;
        const previousState = { ...initialState, entities };
        const slice = fromPizzas.getPizzasEntities(previousState);

        expect(slice).toEqual(entities);
      });
    });
  });
});
