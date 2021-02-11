import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pizza } from '../../models/pizza.model';
import { PizzasService, ToppingsService } from '../../services';

import { Topping } from '../../models/topping.model';

@Component({
  selector: 'app-product-item',
  styleUrls: ['product-item.component.scss'],
  template: `
    <div class="product-item">
      <app-pizza-form
        [pizza]="pizza"
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
})
export class ProductItemComponent implements OnInit {
  pizza: Pizza;
  visualise: Pizza;
  toppings: Topping[];

  constructor(
    private pizzaService: PizzasService,
    private toppingsService: ToppingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pizzaService.getPizzas().subscribe((pizzas) => {
      const param = this.route.snapshot.params.id;
      let pizza;
      if (param === 'new') {
        pizza = {};
      } else {
        pizza = pizzas.find((p) => p.id === parseInt(param, 10));
      }
      this.pizza = pizza;
      this.toppingsService.getToppings().subscribe((toppings) => {
        this.toppings = toppings;
        this.onSelect(toppings.map((topping) => topping.id));
      });
    });
  }

  onSelect(event: number[]): void {
    let toppings;
    if (this.toppings && this.toppings.length) {
      toppings = event.map((id) =>
        this.toppings.find((topping) => topping.id === id)
      );
    } else {
      toppings = this.pizza.toppings;
    }
    this.visualise = { ...this.pizza, toppings };
  }

  onCreate(event: Pizza): void {
    this.pizzaService.createPizza(event).subscribe((pizza) => {
      this.router.navigate([`/products/${pizza.id}`]).then();
    });
  }

  onUpdate(event: Pizza): void {
    this.pizzaService.updatePizza(event).subscribe(() => {
      this.router.navigate([`/products`]).then();
    });
  }

  onRemove(event: Pizza): void {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.pizzaService.removePizza(event).subscribe(() => {
        this.router.navigate([`/products`]).then();
      });
    }
  }
}
