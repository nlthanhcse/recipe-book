import {Recipe} from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Recipe 1 name', 'Recipe 1 description', 'https://exp.gg/vn/wp-content/uploads/2020/04/chillout-1200x900.jpg'),
    new Recipe('Recipe 2 name', 'Recipe 2 description', 'https://exp.gg/vn/wp-content/uploads/2020/04/chillout-1200x900.jpg')
  ];

  public getAll() {
    return this.recipes.slice();
  }
}
