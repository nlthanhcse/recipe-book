import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Orange', 5)
  ];

  // khi ingredients list co su thay doi
  private ingredientsChanged = new Subject<Ingredient[]>();
  private selectedIngredientIndex = new Subject<number>();

  public getIngredents() {
    return this.ingredients.slice();
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredents());
  }

  public updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.getIngredents());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredents());
  }

  public getIngredient(index: number) {
    return this.ingredients.slice(index, index + 1)[0];
  }

  public getIngredientsChanged() {
    return this.ingredientsChanged;
  }

  public getSelectedIngredientIndex() {
    return this.selectedIngredientIndex;
  }
}
