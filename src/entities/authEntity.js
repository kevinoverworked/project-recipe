import { Sequelize } from "sequelize";
import ORM from "../utils/ORM";

const orm = new ORM().connect();

let authEntity = orm.define(
    "authtokens",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: Sequelize.TEXT
        },
        owner: {
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

module.exports = authEntity;