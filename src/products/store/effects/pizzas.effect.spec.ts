import * as fromEffects from './pizzas.effect';
import * as fromActions from '../actions/pizzas.action';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { PizzasService } from '../../services';
import { provideMockActions } from '@ngrx/effects/testing';
import { PizzasEffects } from './pizzas.effect';
import { Actions } from '@ngrx/effects';
import { Pizza } from '../../models/pizza.model';
import { cold, hot } from 'jasmine-marbles';

describe('PizzasEffects', () => {
  let actions$;
  let service;
  let effects: fromEffects.PizzasEffects;

  const pizzas: Pizza[] = [
    { id: 1, name: 'Pizza #1', toppings: [] },
    { id: 2, name: 'Pizza #2', toppings: [] },
    { id: 3, name: 'Pizza #3', toppings: [] },
  ];

  beforeEach(() => {
    actions$ = new Observable<Action>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PizzasService,
        provideMockActions(() => actions$),
        fromEffects.PizzasEffects,
      ],
    });

    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(PizzasService);
    effects = TestBed.inject(fromEffects.PizzasEffects);

    spyOn(service, 'getPizzas').and.returnValue(of(pizzas));
  });

  describe('loadPizzas$', () => {
    it('should return a collection of loadPizzaSuccess', () => {
      const action = fromActions.loadPizzas();
      const completion = fromActions.loadPizzasSuccess({ payload: pizzas });

      actions$ =        hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadPizzas$).toBeObservable(expected);
    });
  });
});
