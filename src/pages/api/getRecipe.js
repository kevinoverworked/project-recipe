const RecipeModel = require("../../../server/models/RecipeModel");

export default function handler(req, res) {
    res.status(200).json({ name: "John Doe" });
}
