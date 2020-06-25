import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Injectable} from '@angular/core';

export class ShoppingService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 10),
    new Ingredient('Orange', 5)
  ];

  private addIngredient = new EventEmitter<Ingredient>();
  // khi ingredients list co su thay doi
  private ingredientsChanged = new EventEmitter<Ingredient[]>();

  public getIngredents() {
    return this.ingredients.slice();
  }

  public getAddIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredents());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredents());
  }

  public getIngredientsChanged() {
    return this.ingredientsChanged;
  }

}
