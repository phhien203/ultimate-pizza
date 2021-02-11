import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PizzasService } from '../../services';
import * as pizzasActions from '../actions';
import { catchError, map, switchMap } from 'rxjs/operators';
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
}
