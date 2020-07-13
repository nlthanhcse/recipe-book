import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeComponent} from './recipe/recipe.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RequireSelectRecipeComponent} from './recipe/require-select-recipe/require-select-recipe.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe/recipe-edit/recipe-edit.component';
import {LoginComponent} from './login/login.component';
import {RecipesResolverService} from './recipe/recipes-resolver.service';

const routes: Routes = [
  // {path: '', component: LoginComponent, pathMatch: 'full'}, // pathMatch: 'full' means only redirect when the url is fully empty
  {path: 'recipe', component: RecipeComponent, children: [
      {path: '', component: RequireSelectRecipeComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]},
  {path: 'shopping', component: ShoppingListComponent},
  {path: 'auth', component: LoginComponent}
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
