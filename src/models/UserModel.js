import HttpStatusError from "../utils/HttpStatusError";
import ORM from "../utils/ORM";
import userEntity from "../entities/userEntity";
import SecretsModel from "./SecretsModel";

const orm = new ORM().connect();


class UserModel {
    constructor(entity = userEntity) {
        this.entity = entity;
    }

    async createOne(requestValues) {
        if (!requestValues || typeof requestValues !== "object") {
            throw new HttpStatusError(400, "No data provided. No action taken");
        }
        try {
            const newUser = await this.entity.create(
                { ...requestValues, createdBy: "system" },
                { fields: ["first_name", "last_name", "email", "createdBy"]}
            );
            const secretsModel = new SecretsModel(),
                userSecret = await secretsModel.createOne(newUser.dataValues.id, requestValues.password);
                            
            await this.updateOne(newUser.dataValues.id, { "secret_id": userSecret.id });
            return await this.getOne(newUser.dataValues.id);

        } catch(error) {
            throw new Error(error.message);
        }
        
    }

    async getAll() {
        try {
            return await this.entity.findAll()
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
                { ...dataToUpdate, updatedBy: "system" },
                { where: { id: userId }, fields: ["first_name", "last_name", "email", "secret_id", "updatedBy"] }
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

module.exports = UserModel;