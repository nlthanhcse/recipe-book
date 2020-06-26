import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeComponent} from './recipe/recipe.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RequireSelectRecipeComponent} from './recipe/require-select-recipe/require-select-recipe.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipe', pathMatch: 'full'}, // pathMatch: 'full' means only redirect when the url is fully empty
  {path: 'recipe', component: RecipeComponent, children: [
      {path: '', component: RequireSelectRecipeComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]},
  {path: 'shopping', component: ShoppingListComponent},
  // {path: '**', redirectTo: '/recipe'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
