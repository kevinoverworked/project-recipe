const Sequelize = require("sequelize");

class ORM {
    constructor(orm = global.orm) {
        this.orm = orm;
    }

    _setupGlobalORM() {
        // let orm = new Sequelize(
        //     process.env["DB_HOST"], 
        //     process.env["DB_USER"],
        //     process.env["DB_PASS"],
        //     {
        //         dialect: "mysql",
        //         host: process.env["DB_SERVER"],
        //         pool: {
        //             max: 5,
        //             min: 1
        //         }
        //     });
        let orm = new Sequelize({
			dialect: "sqlite",
			storage: "localdev.sqlite"
		});
        orm.sync({force: true});
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