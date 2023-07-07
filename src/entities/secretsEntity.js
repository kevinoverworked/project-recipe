import { Sequelize } from "sequelize";
import ORM from "../utils/ORM";

const orm = new ORM().connect();

let secretsEntity = orm.define(
    "secrets",
    {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        token: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        owner: {
            type: Sequelize.TEXT,
            allowNull: false
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

module.exports = secretsEntity;