import { UserModel } from "../models/userModel.js";

class UserDAO {
    //para mocks
    async insertMany(users) {
        return await UserModel.insertMany(users);
    }

    //crud
    async getAll() {
        return await UserModel.find().lean();
    }

    async getById(id) {
        return await UserModel.findById(id).lean();
    }

    async create(data) {
        const newUser = new UserModel(data);
        return await newUser.save();
    }

    async updateById(id, data) {
        return await UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteById(id) {
        return await UserModel.findByIdAndDelete(id).lean();
    }
}

export default new UserDAO();