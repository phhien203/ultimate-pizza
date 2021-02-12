import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private readonly store: Store<fromStore.ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const pizzaId = +route.paramMap.get('pizzaId');
        return this.hasPizza(pizzaId);
      })
    );
  }

  private hasPizza(pizzaId: number): Observable<boolean> {
    return this.store
      .select(fromStore.getPizzaEntities)
      .pipe(map((entities: { [id: number]: Pizza }) => !!entities[pizzaId]));
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
