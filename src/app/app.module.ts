import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {RecipeComponent} from './recipe/recipe.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {RecipeListComponent} from './recipe/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe/recipe-list/recipe-item/recipe-item.component';
import {HeaderComponent} from './header/header.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {RouterModule} from '@angular/router';
import {ShoppingService} from './shopping-list/shopping.service';
import {AppRoutingModule} from './app-routing.module';
import { RequireSelectRecipeComponent } from './recipe/require-select-recipe/require-select-recipe.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecipeService} from './recipe/recipe.service';
import { FilterPipe } from './shopping-list/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    HeaderComponent,
    DropdownDirective,
    RequireSelectRecipeComponent,
    RecipeEditComponent,
    LoginComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule // reactive approach
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ShoppingService,
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
