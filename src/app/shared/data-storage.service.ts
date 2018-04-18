import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
// import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              // private shoppingListService: ShoppingListService,
              private authService: AuthService) {
  }

  storeRecipes() {
    // return this.httpClient.put('https://recipe-book-25872.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //   });
    const req = new HttpRequest('PUT', 'https://recipe-book-25872.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      { reportProgress: true });
    return this.httpClient.request(req);
  }

  getRecipes() {
    this.httpClient.get<Recipe[]>('https://recipe-book-25872.firebaseio.com/recipes.json',
      {
        observe: 'body',
        responseType: 'json',
      })
      .map(
        (recipes) => {
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

