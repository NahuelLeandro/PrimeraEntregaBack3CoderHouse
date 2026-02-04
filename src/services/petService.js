import petDAO from "../dao/petDao.js";
import CustomError from "../utils/CustomError.js";

class PetService {
    async getAllPets() {
        //return await petDAO.getAll();
        const pets = await petDAO.getAll();

        if (!pets.length) {
            throw new CustomError("No hay mascotas cargadas", 404);
        }

        return pets;
    }

    async getPetById(id) {

        const pet = await petDAO.getById(id);
        
        if (!pet) {
            throw new CustomError("Mascota no encontrada", 404);
        }
        
        return pet;
    }

    async createPet(data) {
        const { name, species, age } = data;

        if (!name || !species || !age) {
            throw new CustomError("Campos obligatorios faltantes", 400);
        }

        return await petDAO.create(data);
    }

    async updatePet(id, data) {
        const updated = await petDAO.updateById(id, data);
        if (!updated) {
            throw new CustomError("Mascota no encontrada", 404);
        }
        return updated;
    }

    async deletePet(id) {

        const deleted = await petDAO.deleteById(id);
    
        if (!deleted) {
            throw new CustomError("Mascota no encontrada", 404);
        }

        return deleted;
    }
}

export default new PetService();