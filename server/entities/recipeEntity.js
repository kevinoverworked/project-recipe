const Sequelize = require("sequelize"),
    ORM = require("../utils/ORM"),
    orm = new ORM().connect();

let recipeEntity = orm.define(
    "recipe",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        recipe_name: {
            type: Sequelize.TEXT
        },
        ingredients: {
            type: Sequelize.TEXT
        },
        directions: {
            type: Sequelize.TEXT
        },
        createdBy: {
			type: Sequelize.STRING
		},
		updatedBy: {
			type: Sequelize.STRING
		}
    },
    {
        timestamps: true
    }
);

module.exports = recipeEntity;