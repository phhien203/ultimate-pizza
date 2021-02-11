import { Component, OnInit } from '@angular/core';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services';

@Component({
  selector: 'app-products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" routerLink="./new"> New Pizza </a>
      </div>
      <div class="products__list">
        <div *ngIf="!pizzas?.length">No pizzas, add one to get started.</div>
        <app-pizza-item *ngFor="let pizza of pizzas" [pizza]="pizza"></app-pizza-item>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas: Pizza[];

  constructor(private pizzaService: PizzasService) {}

  ngOnInit(): void {
    this.pizzaService.getPizzas().subscribe((pizzas) => {
      this.pizzas = pizzas;
    });
  }
}
