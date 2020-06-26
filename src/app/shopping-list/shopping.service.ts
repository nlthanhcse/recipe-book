import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Orange', 5)
  ];

  private addIngredient = new Subject<Ingredient>();
  // khi ingredients list co su thay doi
  private ingredientsChanged = new Subject<Ingredient[]>();

  public getIngredents() {
    return this.ingredients.slice();
  }

  public getAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredents());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredents());
  }

  public getIngredientsChanged() {
    return this.ingredientsChanged;
  }

}
