import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
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

    if (this.isEdit) {
      const recipe = this.recipeService.getRecipe(this.index);
      recipeName = recipe.name;
      recipeImg = recipe.imgPath;
      recipeDesc = recipe.description;
    } else {

    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      img: new FormControl(recipeImg),
      descr: new FormControl(recipeDesc)
    });
  }

  public submit() {
    console.log(this.recipeForm);
  }
}
