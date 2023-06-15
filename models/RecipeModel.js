import HttpStatusError from "../utils/HttpStatusError";
import ORM from "../utils/ORM";
import recipeEntity from "../entities/recipeEntity";

const orm = new ORM().connect();


class RecipeModel {
    constructor(entity = recipeEntity) {
        this.entity = entity;
    }

    async createOne(requestValues) {
        if (!requestValues || typeof requestValues !== "object") {
            throw new HttpStatusError(400, "No data provided. No action taken");
        }
        try {
            return await this.entity.create(
                { ...requestValues, createdBy: "kevinoverworked@gmail.com" },
                { fields: ["recipe_name", "ingredients", "directions", "createdBy"]}
            );
        } catch (error) {
            throw new Error(error.message);
        }
        
    }
}

module.exports = RecipeModel;