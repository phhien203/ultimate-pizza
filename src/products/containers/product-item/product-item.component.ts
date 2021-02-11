import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export const SELECTED_PIZZA = new InjectionToken<Observable<Pizza>>(
  'Observable of Pizza from router store'
);

@Component({
  selector: 'app-product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div class="product-item">
      <app-pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <app-pizza-display [pizza]="visualise"> </app-pizza-display>
      </app-pizza-form>
    </div>
  `,
  providers: [
    {
      provide: SELECTED_PIZZA,
      useFactory: (store: Store<fromStore.ProductsState>) => {
        return store.select(fromStore.getSelectedPizza);
      },
      deps: [Store],
    },
  ],
})
export class ProductItemComponent implements OnInit {
  // pizza$: Observable<Pizza>;
  visualise: Pizza;
  toppings: Topping[];

  constructor(
    @Inject(SELECTED_PIZZA)
    public readonly pizza$: Observable<Pizza>
  ) {}

  ngOnInit(): void {
    // this.pizza$ = this.store.select(fromStore.getSelectedPizza);
  }

  onSelect(event: number[]): void {
    // let toppings;
    // if (this.toppings && this.toppings.length) {
    //   toppings = event.map((id) =>
    //     this.toppings.find((topping) => topping.id === id)
    //   );
    // } else {
    //   toppings = this.pizza.toppings;
    // }
    // this.visualise = { ...this.pizza, toppings };
  }

  onCreate(event: Pizza): void {
    // this.pizzaService.createPizza(event).subscribe((pizza) => {
    //   this.router.navigate([`/products/${pizza.id}`]).then();
    // });
  }

  onUpdate(event: Pizza): void {
    // this.pizzaService.updatePizza(event).subscribe(() => {
    //   this.router.navigate([`/products`]).then();
    // });
  }

  onRemove(event: Pizza): void {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      // this.pizzaService.removePizza(event).subscribe(() => {
      //   this.router.navigate([`/products`]).then();
      // });
    }
  }
}
