import sqlite3 from "sqlite3";
import mysql2 from "mysql2";
import { Sequelize } from "sequelize";

class ORM {
    constructor(orm = global.orm) {
        this.orm = orm;
    }

    _setupGlobalORM() {
        let orm = new Sequelize({
			dialect: "sqlite",
            dialectModule: sqlite3,
			storage: "localdev.sqlite"
		});
        // if ("DB_SERVER" in process.env) {
		// 	orm = new Sequelize(process.env["DB_DATABASE"], process.env["DB_USERNAME"], process.env["DB_PASSWORD"], {
		// 		dialect: "mysql",
        //         dialectModule: mysql2,
		// 		host: process.env["DB_SERVER"],
		// 		pool: {
		// 			max: 5,
		// 			min: 1
		// 		}
		// 	});
		// }

        orm.sync();
        this.orm = orm;
        global.orm = orm;
    }

    connect() {
        if (!global.orm) {
            this._setupGlobalORM();
        }
        return global.orm;
    }
}

module.exports = ORM;