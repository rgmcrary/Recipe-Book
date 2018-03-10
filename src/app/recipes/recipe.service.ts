import {EventEmitter, Injectable} from "@angular/core";

import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is a sample.',
      'https://www.maangchi.com/wp-content/uploads/2013/09/kimbap.jpg',
      [
        new Ingredient('Rice', 1),
        new Ingredient('Seaweed Paper', 2),
        new Ingredient('Tuna', 2)
      ]),
    new Recipe(
      'Another Test Recipe',
      'This is a sample.',
      'https://www.maangchi.com/wp-content/uploads/2013/09/kimbap.jpg',
      [
        new Ingredient('Rice', 1),
        new Ingredient('Seaweed Paper', 2),
        new Ingredient('Tuna', 2)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
      }

}
