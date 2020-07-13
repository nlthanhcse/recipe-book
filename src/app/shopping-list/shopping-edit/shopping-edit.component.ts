import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  isEditMode = false;
  selectedIngredient: Ingredient;
  selectedIngredientIndex: number;

  constructor(private shoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.shoppingService.getSelectedIngredientIndex()
      .subscribe(
        (index: number) => {
          this.isEditMode = true;
          this.selectedIngredientIndex = index;
          this.selectedIngredient = this.shoppingService.getIngredient(index);
          this.form.setValue(
            {
              name: this.selectedIngredient.name,
              amount: this.selectedIngredient.amount
            }
          );
        });
  }

  public onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.isEditMode) {
      this.shoppingService.addIngredient(newIngredient);
    } else {
      this.shoppingService.updateIngredient(this.selectedIngredientIndex, newIngredient);
    }
  }

  onClear() {
    this.form.reset();
    this.isEditMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.selectedIngredientIndex);
    this.isEditMode = false;
  }
}
