import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  private recipesChanged: Subscription;
  filterString = '';
  private isFetching = false;

  constructor(private recipeService: RecipeService,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit(): void {
    this.isFetching = true;
    this.recipesChanged = this.dataStorageService.fetchData()
      .subscribe(
        () => {
          this.isFetching = false;
        });

    this.recipes = this.recipeService.getAll();
    this.recipesChanged = this.recipeService.getRecipesChanged()
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  public getIsFetching() {
    return this.isFetching;
  }

  public setIsFetching(isFetching: boolean) {
    this.isFetching = isFetching;
  }

  ngOnDestroy() {
    this.recipesChanged.unsubscribe();
  }
}
