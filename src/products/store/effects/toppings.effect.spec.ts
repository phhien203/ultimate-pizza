import { Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { ToppingsService } from '../../services';

import * as fromEffects from './toppings.effect';
import * as fromActions from '../actions/toppings.action';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { cold, hot } from 'jasmine-marbles';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

describe('ToppingsEffects', () => {
  let actions$: Actions;
  let service: ToppingsService;
  let effects: fromEffects.ToppingsEffects;

  const toppings = [
    { id: 1, name: 'onion' },
    { id: 2, name: 'mushroom' },
    { id: 3, name: 'basil' },
  ];

  beforeEach(() => {
    actions$ = new Observable<Action>();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ToppingsService,
        provideMockActions(() => actions$),
        fromEffects.ToppingsEffects,
      ],
    });

    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(ToppingsService);
    effects = TestBed.inject(fromEffects.ToppingsEffects);

    spyOn(service, 'getToppings').and.returnValue(of(toppings));
  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingSuccess', () => {
      const action = fromActions.loadToppings();
      const completion = fromActions.loadToppingsSuccess({ payload: toppings });

      actions$ =        hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadToppings$).toBeObservable(expected);
    });
  });
});
