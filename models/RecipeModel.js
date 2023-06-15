const HttpStatusError = require("../utils/HttpStatusError"),
    ORM = require("../utils/ORM"),
    orm = new ORM().connect();

// import HttpStatusError from "../utils/HttpStatusError";
// import ORM from "../utils/ORM";
// import recipeEntity from "../entities/recipeEntity";

// const orm = new ORM().connect();


class RecipeModel {
    constructor(entity = require("../entities/recipeEntity")) {
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