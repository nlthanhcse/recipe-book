import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingredient_name_input') ingredient_name_input: ElementRef;
  @ViewChild('ingredient_amount_input') ingredient_amount_input: ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  addIngredientClicked() {
    const ingredient_name = this.ingredient_name_input.nativeElement.value;
    const ingredient_amount = this.ingredient_amount_input.nativeElement.value;
    this.shoppingService.getAddIngredient(new Ingredient(ingredient_name, ingredient_amount));
  }
}
