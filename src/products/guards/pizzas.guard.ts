import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private readonly store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getPizzaLoaded).pipe(
      tap((loaded) => {
        if (!loaded) {
          this.store.dispatch(fromStore.loadPizzas());
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
