import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { back, forward, navigate } from '../actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(navigate),
    map((action) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras }).then();
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(back),
    tap(() => {
      this.location.back();
    })
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(forward),
    tap(() => {
      this.location.forward();
    })
  );
}
