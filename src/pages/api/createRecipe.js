const RecipeModel = require("../../../server/models/RecipeModel");

export default async (req, res) => {
    console.log(req.body);
    if (!req.body) {
        return res.status(400).json({
            message: "400 Bad Request; Request body params missing."
        });
    }

    const recipeModel = new RecipeModel(),
        recipe = await recipeModel.createOne(req.body);

    res.status(200).json(recipe);
}
