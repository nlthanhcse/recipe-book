import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isEdit = false;
  index: number;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = +params.id;
          this.isEdit = params.id !== undefined; // !== undefined means edit mode => isEdit = true
          this.initForm();
        }
      );
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if (this.isEdit) {
      const recipe = this.recipeService.getRecipe(this.index);
      recipeName = recipe.name;
      recipeImg = recipe.imgPath;
      recipeDesc = recipe.description;
      recipeIngredients = new FormArray([]);
      for (const ingre of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingre.name),
            amount: new FormControl(ingre.amount)
          })
        );
      }
    } else {

    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imgPath: new FormControl(recipeImg),
      description: new FormControl(recipeDesc),
      ingredients: recipeIngredients
    });
  }

  public submit() {
    console.log(this.recipeForm.value);
    if (this.isEdit) {
      this.recipeService.updtateRecipe(this.index, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  public getIngredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  public addIngredient() {
    ( this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null),
        amount: new FormControl(null)
      })
    );
  }
}
