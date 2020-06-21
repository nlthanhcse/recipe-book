import {Ingredient} from '../shared/ingredient.model';

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Orange', 5)
  ];

  public getIngredents() {
    return this.ingredients.slice();
  }
}
