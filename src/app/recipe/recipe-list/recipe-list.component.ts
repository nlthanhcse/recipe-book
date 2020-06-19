import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Recipe 1 name', 'Recipe 1 description', 'https://exp.gg/vn/wp-content/uploads/2020/04/chillout-1200x900.jpg'),
    new Recipe('Recipe 2 name', 'Recipe 2 description', 'https://exp.gg/vn/wp-content/uploads/2020/04/chillout-1200x900.jpg')
  ];

  @Output() outRecipeClicked_2 = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  getRecipeClicked_1(recipe: Recipe) {
    this.outRecipeClicked_2.emit(recipe);
  }
}
