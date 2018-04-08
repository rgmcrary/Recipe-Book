import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://recipe-book-25872.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://recipe-book-25872.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe[ 'ingredients' ]) {
              recipe[ 'ingredients' ] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

  // storeIngredients() {
  //   return this.http.put('https://recipe-book-25872.firebaseio.com/ingredients.json',
  //     this.shoppingListService.getIngredients());
  // }
  //
  // getIngredients() {
  //   return this.http.get('https://recipe-book-25872.firebaseio.com/ingredients.json' + token)
  //     .map(
  //       (response: Response) => {
  //         const ingredients: Ingredient[] = response.json();
  //         return ingredients;
  //       }
  //     )
  //     .subscribe(
  //       (ingredients: Ingredient[]) => {
  //         this.shoppingListService.addIngredients(ingredients);
  //       }
  //     );
  // }
}

