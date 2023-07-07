import HttpStatusError from "../utils/HttpStatusError";
import ORM from "../utils/ORM";
import secretsEntity from "../entities/secretsEntity";
import { hashPass } from "../utils/hashPass";

const orm = new ORM().connect();


class SecretsModel {
    constructor(entity = secretsEntity) {
        this.entity = entity;
    }

    async createOne(owner, unHashPass) {
        if (!owner) throw new HttpStatusError(400, "No user ID provided. No action taken.");
        try {
            const token = await hashPass(unHashPass);
            const secret = await this.entity.create(
                { owner, token, createdBy: "system" },
                { fields: ["owner", "token", "createdBy"]}
            );
            return await secret.dataValues;
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async getOne(userId) {
        if (!userId) throw new HttpStatusError(400, "No user ID provided. No action taken.");

        try {
            return await this.entity.findAll({
                where: {
                    id: userId
                }
            })
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async updateOne(userId, dataToUpdate) {
        if (!userId) throw new HttpStatusError(400, "No user ID provided. No action taken.");
        if (!dataToUpdate || typeof dataToUpdate != "object")
			throw new HttpStatusError(400, "No data provided. No action taken.");

        try {
            return await this.entity.update(
                { ...dataToUpdate },
                { where: { id: userId }, fields: ["first_name", "last_name", "email", "token_id"] }
            )
        } catch(error) {
            throw new Error(error.message);
        }
    }

    async deleteOne(userId) {
        if (!userId) throw new HttpStatusError(400, "No user ID provided. No action taken.");

        try {
            return await this.entity.destroy({
                where: { id: userId }
            })
        } catch(error) {
            throw new Error(error.message);
        }
    }
        
}

module.exports = SecretsModel;