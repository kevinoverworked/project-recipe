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
        } catch(error) {
            throw new Error(error.message);
        }
        
    }

    async getAll() {
        try {
            return await this.entity.findAll()
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async getOne(recipeId) {
        if (!recipeId) throw new HttpStatusError(400, "No recipe ID provided. No action taken.");

        try {
            return await this.entity.findAll({
                where: {
                    id: recipeId
                }
            })
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async updateOne(recipeId, dataToUpdate) {
        if (!recipeId) throw new HttpStatusError(400, "No recipe ID provided. No action taken.");
        if (!dataToUpdate || typeof dataToUpdate != "object")
			throw new HttpStatusError(400, "No data provided. No action taken.");

        try {
            return await this.entity.update(
                { ...dataToUpdate },
                { where: { id: recipeId }, fields: ["recipe_name", "ingredients", "directions"] }
            )
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async deleteOne(recipeId) {
        if (!recipeId) throw new HttpStatusError(400, "No recipe ID provided. No action taken.");

        try {
            return await this.entity.destroy({
                where: { id: recipeId }
            })
        } catch(error) {
            throw new Error(error.message);
        }
    }
        
}

module.exports = RecipeModel;