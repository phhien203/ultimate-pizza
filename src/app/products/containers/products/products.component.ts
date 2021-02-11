import { Component, OnInit } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromPizzas from '../../store';

@Component({
  selector: 'app-products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" routerLink="./new"> New Pizza </a>
      </div>
      <div class="products__list">
        <div *ngIf="!(pizzas$ | async)?.length">
          No pizzas, add one to get started.
        </div>
        <app-pizza-item
          *ngFor="let pizza of pizzas$ | async"
          [pizza]="pizza"
        ></app-pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.pizzas$ = this.store.select(fromPizzas.getAllPizzas);
    this.store.dispatch(fromPizzas.loadPizzas());
  }
}
