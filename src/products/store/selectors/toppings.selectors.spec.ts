import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors/toppings.selectors';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { Topping } from '../../models/topping.model';
import { TestBed } from '@angular/core/testing';

describe('Toppings Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const toppings: Topping[] = [
    { id: 1, name: 'bacon' },
    { id: 2, name: 'pepperoni' },
    { id: 3, name: 'tomato' },
  ];

  const entities = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers),
        }),
      ],
    });

    store = TestBed.inject(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getToppingsEntities', () => {
    it('should return toppings as entities', () => {
      let result = null;

      store.select(fromSelectors.getToppingsEntities).subscribe((value) => {
        result = value;
      });

      expect(result).toEqual({});

      store.dispatch(fromActions.loadToppingsSuccess({ payload: toppings }));

      expect(result).toEqual(entities);
    });
  });

  describe('getSelectedToppings', () => {
    it('should return selected toppings as ids', () => {
      let result = null;

      store.select(fromSelectors.getSelectedToppings).subscribe((value) => {
        result = value;
      });

      store.dispatch(fromActions.loadToppingsSuccess({ payload: toppings }));

      expect(result).toEqual([]);

      store.dispatch(fromActions.visualizeToppings({ payload: [1, 3] }));

      expect(result).toEqual([1, 3]);
    });
  });
});
