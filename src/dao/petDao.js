

import { PetModel } from "../models/petModel.js";

class PetDAO {
    //para mocks
    async insertMany(pets) {
        return await PetModel.insertMany(pets);
    }
    //crud
    async getAll() {
        return await PetModel.find().lean();
    }

    async getById(id) {
        return await PetModel.findById(id).lean();
    }

    async create(data) {
        const newPet = new PetModel(data);
        return await newPet.save();
    }

    async updateById(id, data) {
        return await PetModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteById(id) {
        return await PetModel.findByIdAndDelete(id).lean();
    }
}

export default new PetDAO();

