import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ToppingsService } from '../../services';
import { loadToppings, loadToppingsFail, loadToppingsSuccess, } from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Topping } from '../../models/topping.model';
import { of } from 'rxjs';

@Injectable()
export class ToppingsEffects {
  constructor(
    private readonly actions$: Actions,
    private toppingService: ToppingsService
  ) {}

  @Effect()
  loadToppings$ = this.actions$.pipe(
    ofType(loadToppings),
    switchMap(() =>
      this.toppingService.getToppings().pipe(
        map((toppings: Topping[]) =>
          loadToppingsSuccess({ payload: toppings })
        ),
        catchError((err) => of(loadToppingsFail({ payload: err })))
      )
    )
  );
}
