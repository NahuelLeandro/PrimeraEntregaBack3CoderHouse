import { UserModel } from "../models/User.model.js";

class UserDAO {
    async insertMany(users) {
        return await UserModel.insertMany(users);
    }

    async getAll() {
        return await UserModel.find();
    }
}

export const userDAO = new UserDAO();