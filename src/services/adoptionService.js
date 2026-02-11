import adoptionDAO from "../dao/adoptionDao.js";
import userDAO from "../dao/userDao.js";
import petDAO from "../dao/petDao.js";
import CustomError from "../utils/CustomError.js";

class AdoptionService {

    async getAllAdoptions() {
        const adoptions = await adoptionDAO.getAll();

        if (!adoptions.length) {
            throw new CustomError("No hay adopciones registradas", 404);
        }

        return adoptions;
    }

    async getAdoptionById(id) {
        const adoption = await adoptionDAO.getById(id);

        if (!adoption) {
            throw new CustomError("Adopción no encontrada", 404);
        }

        return adoption;
    }

    async createAdoption(data) {
        const { owner, pet } = data;

        if (!owner || !pet) {
            throw new CustomError("Owner y Pet son obligatorios", 400);
        }

        // validar user
        const user = await userDAO.getById(owner);
        if (!user) {
            throw new CustomError("Usuario no existe", 404);
        }

        // validar pet
        const petDoc = await petDAO.getById(pet);
        if (!petDoc) {
            throw new CustomError("Mascota no existe", 404);
        }

        // validar si ya está adoptado
        if (petDoc.adopted) {
            throw new CustomError("La mascota ya está adoptada", 400);
        }

        // crear adoption
        const adoption = await adoptionDAO.create({ owner, pet });

        // actualizar pet
        await petDAO.updateById(pet, {
            adopted: true,
            owner: owner
        });

        // actualizar user → agregar pet
        user.pets.push(pet);
        await userDAO.updateById(owner, { pets: user.pets });

        return adoption;
    }


    async returnAdoption(id) {
        const adoption = await adoptionDAO.getById(id);

        if (!adoption) {
            throw new CustomError("Adopción no encontrada", 404);
        }

        if (adoption.status === "returned") {
            throw new CustomError("La mascota ya fue devuelta", 400);
        }

        const { owner, pet } = adoption;

        // marcar adoption como devuelta
        await adoptionDAO.updateById(id, { status: "returned" });

        // liberar pet
        await petDAO.updateById(pet._id, {
            adopted: false,
            owner: null
        });

        // quitar pet del user
        const user = await userDAO.getById(owner._id);
        const updatedPets = user.pets.filter(
            p => p.toString() !== pet._id.toString()
        );

        await userDAO.updateById(owner._id, { pets: updatedPets });

        return { message: "Mascota devuelta correctamente" };
    }

    async deleteAdoption(id) {
        const adoption = await adoptionDAO.getById(id);

        if (!adoption) {
            throw new CustomError("Adopción no encontrada", 404);
        }

        const { owner, pet } = adoption;

        // revertir estado pet
        await petDAO.updateById(pet._id, {
            adopted: false,
            owner: null
        });

        // quitar pet del user
        const user = await userDAO.getById(owner._id);
        const updatedPets = user.pets.filter(
            p => p.toString() !== pet._id.toString()
        );

        await userDAO.updateById(owner._id, { pets: updatedPets });

        // borrar adoption
        const deleted = await adoptionDAO.deleteById(id);

        return deleted;
    }
}

export default new AdoptionService();