import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable()

export class ShoppingListService {
    public ingredientsChanged = new Subject<Ingredient[]>();
    public startedEditing = new Subject<number>();
    public ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.emitUpdatedList();
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.emitUpdatedList();
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.emitUpdatedList();
    }

    removeIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.emitUpdatedList();
    }

    emitUpdatedList() {
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}