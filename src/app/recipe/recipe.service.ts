import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {
  private recipeClicked = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Recipe 1 name',
      'Recipe 1 description',
      'https://exp.gg/vn/wp-content/uploads/2020/04/chillout-1200x900.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Carrot', 20)
      ]),
    new Recipe('Recipe 2 name',
      'Recipe 2 description',
      'https://i.ytimg.com/vi/WPXk8uaOcA0/maxresdefault.jpg',
      [
        new Ingredient('Beef', 2),
        new Ingredient('Onion', 10)
      ])
  ];

  public getAll() {
    return this.recipes.slice();
  }

  public getRecipeClicked() {
    return this.recipeClicked;
  }
}
