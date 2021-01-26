import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
    public recipeSelected = new Subject<Recipe>();
    public recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    // private recipes: Recipe[] = [
    //     new Recipe("Pumpkin Pad Thai",
    //      "Favorite asian meal for Halloween!",
    //      "https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg",
    //      [
    //          new Ingredient('Pumpkin', 1),
    //          new Ingredient('Pad Thai', 1)
    //      ]),
    //     new Recipe("Shakshuka",
    //      "Scrambled eggs 2.0.",
    //      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg",
    //      [
    //          new Ingredient('Eggs', 3),
    //          new Ingredient('Pepper', 1),
    //          new Ingredient('Rest of Shakshuka probably, idk im shit at cooking', 1)
    //      ])
    // ];

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipeByID(id: number) {
        return this.recipes[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    removeRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}