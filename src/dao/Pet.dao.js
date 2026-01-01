import { PetModel } from "../models/Pet.model.js";

class PetDAO {
    async insertMany(pets) {
        return await PetModel.insertMany(pets);
    }

    async getAll() {
        return await PetModel.find();
    }
}

export const petDAO = new PetDAO();