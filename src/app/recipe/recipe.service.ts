import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {
  private recipeClicked = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Recipe 1 name', 'Recipe 1 description', 'https://exp.gg/vn/wp-content/uploads/2020/04/chillout-1200x900.jpg'),
    new Recipe('Recipe 2 name', 'Recipe 2 description', 'https://i.ytimg.com/vi/WPXk8uaOcA0/maxresdefault.jpg')
  ];

  public getAll() {
    return this.recipes.slice();
  }

  public getRecipeClicked() {
    return this.recipeClicked;
  }
}
