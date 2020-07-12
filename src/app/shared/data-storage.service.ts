import {Injectable} from '@angular/core';
import {RecipeService} from '../recipe/recipe.service';
import {HttpClient} from '@angular/common/http';
import {Recipe} from '../recipe/recipe.model';
import {Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private recipeService: RecipeService,
              private httpClient: HttpClient) {
  }

  private fetched = new Subject<boolean>();

  public saveData() {
    const recipes = this.recipeService.getAll();
    this.httpClient
      .put('https://recipe-book-ec09c.firebaseio.com/recipes.json', recipes)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  public fetchData() {
    return this.httpClient
      .get<Recipe[]>('https://recipe-book-ec09c.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
          this.fetched.next(false);
        })
      );
  }

  public getFetched() {
    return this.fetched;
  }
}
