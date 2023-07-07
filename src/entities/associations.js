import recipeEntity from "./recipeEntity";
import ingredientEntity from "./ingredientEntity";
import userEntity from "./userEntity";
import authEntity from "./authEntity";

userEntity.hasMany(recipeEntity);
authEntity.belongsTo(userEntity, { foreignKey: "owner" });