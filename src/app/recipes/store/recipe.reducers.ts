import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as  RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [ ...action.payload ]
      };
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [ ...state.recipes, action.payload ]
      };
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[ action.payload.index ];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [ ...state.recipes ];
      recipes[ action.payload.index ] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case (RecipeActions.DELETE_RECIPE):
      const oldRecipes = [ ...state.recipes ];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
