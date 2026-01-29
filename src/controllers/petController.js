import petService from "../services/petService.js";

class PetController {
    async getAllPets(req, res) {
        try {
            const pets = await petService.getAllPets();
            res.json({ status: "success", payload: pets });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async getPetById(req, res) {
        try {
            const pet = await petService.getPetById(req.params.pid);
            res.json({ status: "success", payload: pet });
        } catch (error) {
            res.status(404).json({ status: "error", message: error.message });
        }
    }

    async createPet(req, res) {
        try {
            const created = await petService.createPet(req.body);
            res.status(201).json({ status: "success", payload: created });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async updatePetById(req, res) {
        try {
            const updated = await petService.updatePet(req.params.pid, req.body);
            res.json({ status: "success", payload: updated });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async deletePetById(req, res) {
        try {
            const deleted = await petService.deletePet(req.params.pid);
            res.json({ status: "success", payload: deleted });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}

export default new PetController();