import * as fromPizzas from './pizzas.action';

describe('Pizzas Actions', () => {
  describe('LoadPizzas Actions', () => {
    describe('LoadPizzas', () => {
      it('should create an action', () => {
        const action = fromPizzas.loadPizzas();

        expect(action).toEqual({ type: '[Products] Load Pizzas' });
      });
    });

    describe('LoadPizzasSuccess', () => {
      it('should create an action', () => {
        const payload = [
          {
            name: 'Seaside Surfin\'',
            toppings: [
              {
                id: 6,
                name: 'mushroom',
              },
              {
                id: 7,
                name: 'olive',
              },
              {
                id: 2,
                name: 'bacon',
              },
              {
                id: 3,
                name: 'basil',
              },
              {
                id: 1,
                name: 'anchovy',
              },
              {
                id: 8,
                name: 'onion',
              },
              {
                id: 11,
                name: 'sweetcorn',
              },
              {
                id: 9,
                name: 'pepper',
              },
              {
                id: 5,
                name: 'mozzarella',
              },
              {
                id: 10,
                name: 'pepperoni',
              },
            ],
            id: 2,
          },
          {
            name: 'Plain Ol\' Pepperoni',
            toppings: [
              {
                id: 10,
                name: 'pepperoni',
              },
            ],
            id: 3,
          },
        ];
        const action = fromPizzas.loadPizzasSuccess({ payload });

        expect(action).toEqual({
          type: '[Products] Load Pizzas Success',
          payload,
        });
      });
    });

    describe('LoadPizzasFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load pizzas failed' };
        const action = fromPizzas.loadPizzasFail({ payload });

        expect(action).toEqual({
          type: '[Products] Load Pizzas Fail',
          payload,
        });
      });
    });
  });
});
