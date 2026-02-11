import { AdoptionModel } from "../models/adoptionModel.js";

class AdoptionDAO {
    async getAll() {
        return await AdoptionModel
            .find()
            .populate("owner")
            .populate("pet")
            .lean();
    }

    async getById(id) {
        return await AdoptionModel
            .findById(id)
            .populate("owner")
            .populate("pet")
            .lean();
    }

    async create(data) {
        const adoption = new AdoptionModel(data);
        return await adoption.save();
    }

    async updateById(id, data) {
        return await AdoptionModel.findByIdAndUpdate(id, data, { new: true });
    }
    
    async deleteById(id) {
        return await AdoptionModel.findByIdAndDelete(id).lean();
    }
}

export default new AdoptionDAO();