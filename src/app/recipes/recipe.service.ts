import {EventEmitter, Injectable} from "@angular/core";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

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
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}
