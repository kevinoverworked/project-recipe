import { Sequelize } from "sequelize";
import ORM from "../utils/ORM";

const orm = new ORM().connect();

let userEntity = orm.define(
    "user",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        last_name: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        secret_id: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        type: {
            type: Sequelize.TEXT,
            defaultValue: "user"
        },
        status: {
            type: Sequelize.TEXT,
            defaultValue: "active"
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

module.exports = userEntity;