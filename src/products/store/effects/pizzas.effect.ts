import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PizzasService } from '../../services';
import * as pizzasActions from '../actions';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Pizza } from '../../models/pizza.model';
import { of } from 'rxjs';

@Injectable()
export class PizzasEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly pizzasService: PizzasService
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.pipe(
    ofType(pizzasActions.loadPizzas),
    switchMap(() =>
      this.pizzasService.getPizzas().pipe(
        map((pizzas: Pizza[]) =>
          pizzasActions.loadPizzasSuccess({ payload: pizzas })
        ),
        catchError((err) => of(pizzasActions.loadPizzasFail({ payload: err })))
      )
    )
  );

  @Effect()
  createPizza$ = this.actions$.pipe(
    ofType(pizzasActions.createPizza),
    map((action) => action.payload),
    exhaustMap((payload) =>
      this.pizzasService.createPizza(payload).pipe(
        map((pizza) => pizzasActions.createPizzaSuccess({ payload: pizza })),
        catchError((err) => of(pizzasActions.createPizzaFail({ payload: err })))
      )
    )
  );

  @Effect()
  updatePizza$ = this.actions$.pipe(
    ofType(pizzasActions.updatePizza),
    map((action) => action.payload),
    exhaustMap((payload) =>
      this.pizzasService.updatePizza(payload).pipe(
        map((pizza) => pizzasActions.updatePizzaSuccess({ payload: pizza })),
        catchError((err) => of(pizzasActions.updatePizzaFail({ payload: err })))
      )
    )
  );

  @Effect()
  removePizza$ = this.actions$.pipe(
    ofType(pizzasActions.removePizza),
    map((action) => action.payload),
    exhaustMap((payload) =>
      this.pizzasService.removePizza(payload).pipe(
        map(() => pizzasActions.removePizzaSuccess({ payload })),
        catchError((err) => of(pizzasActions.removePizzaFail({ payload: err })))
      )
    )
  );
}
