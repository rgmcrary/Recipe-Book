import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Kimbap',
      'Delicious Korean kimbap.',
      'https://www.maangchi.com/wp-content/uploads/2013/09/kimbap.jpg',
      [
        new Ingredient('Rice', 1),
        new Ingredient('Seaweed Paper', 2),
        new Ingredient('Tuna', 2)
      ]),
    new Recipe(
      'Cheeseburger',
      'Incredible cheeseburger.',
      'https://image.shutterstock.com/z/stock-photo-classic-cheeseburger-isolated-on-white-background-604655519.jpg',
      [
        new Ingredient('Bun', 1),
        new Ingredient('Ground Beef', 1),
        new Ingredient('Cheese', 1),
        new Ingredient('Tomato', 1),
        new Ingredient('Lettuce', 1),
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[ index ];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}