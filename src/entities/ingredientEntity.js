import { Sequelize } from "sequelize";
import ORM from "../utils/ORM";

const orm = new ORM().connect();

let ingredientEntity = orm.define(
    "ingredients",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT
        },
        category: {
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

module.exports = ingredientEntity;