import petDAO from "../dao/petDao.js";

class PetService {
    async getAllPets() {
        return await petDAO.getAll();
    }

    async getPetById(id) {
        const pet = await petDAO.getById(id);
        if (!pet) throw new Error("Mascota no encontrada");
        return pet;
    }

    async createPet(data) {
        const { name, species, age } = data;

        if (!name || !species) {
            throw new Error("Campos obligatorios faltantes");
        }

        return await petDAO.create(data);
    }

    async updatePet(id, data) {
        const updated = await petDAO.updateById(id, data);
        if (!updated) throw new Error("Mascota no encontrada o no actualizada");
        return updated;
    }

    async deletePet(id) {
        const deleted = await petDAO.deleteById(id);
        if (!deleted) throw new Error("Mascota no encontrada");
        return deleted;
    }
}

export default new PetService();