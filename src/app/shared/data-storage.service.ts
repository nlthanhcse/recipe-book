import {Injectable} from '@angular/core';
import {RecipeService} from '../recipe/recipe.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipe/recipe.model';
import {Subject} from 'rxjs';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class DataStorageService {
  constructor(private recipeService: RecipeService,
              private httpClient: HttpClient,
              private authService: AuthService) {
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
    // tslint:disable-next-line:max-line-length
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => { // exhaustMap chờ pipe x r nó thực hiện và thay thế user observerble bằng observerble nội hàm của nó
        return this.httpClient
          .get<Recipe[]>(
            'https://recipe-book-ec09c.firebaseio.com/recipes.json',
            {
              params: new HttpParams().set('auth', user.token)
            }
          );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
        this.fetched.next(false);
      }));
  }

  public getFetched() {
    return this.fetched;
  }
}
