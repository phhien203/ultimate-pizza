import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  styleUrls: ['product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product-item">
      <app-pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <app-pizza-display [pizza]="visualise$ | async"> </app-pizza-display>
      </app-pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;
  visualise$: Observable<Pizza>;

  constructor(private readonly store: Store<fromStore.ProductsState>) {}

  ngOnInit(): void {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza = null) => {
        const pizzaExist = !!(pizza && pizza.toppings);
        const toppings = pizzaExist ? pizza.toppings.map((t) => t.id) : [];
        this.store.dispatch(fromStore.visualizeToppings({ payload: toppings }));
      })
    );
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getVisualizedPizza);
  }

  onSelect(event: number[]): void {
    this.store.dispatch(fromStore.visualizeToppings({ payload: event }));
  }

  onCreate(event: Pizza): void {
    this.store.dispatch(fromStore.createPizza({ payload: event }));
  }

  onUpdate(event: Pizza): void {
    this.store.dispatch(fromStore.updatePizza({ payload: event }));
  }

  onRemove(event: Pizza): void {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(fromStore.removePizza({ payload: event }));
    }
  }
}
