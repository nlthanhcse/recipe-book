import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from './shopping.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientsChanged: Subscription;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredents();
    this.ingredientsChanged = this.shoppingService.getIngredientsChanged()
      .subscribe(
        (ingrediends: Ingredient[]) => {
          this.ingredients = ingrediends;
        }
      );
  }

  ngOnDestroy() {
    this.ingredientsChanged.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppingService.getSelectedIngredientIndex().next(index);
  }
}
