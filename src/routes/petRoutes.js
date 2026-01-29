import express from "express";
import petController from "../controllers/petController.js";

const router = express.Router();

// 🐶 Endpoints de Pets

router.get("/", petController.getAllPets);
router.get("/:pid", petController.getPetById);
router.post("/", petController.createPet);
router.put("/:pid", petController.updatePetById);
router.delete("/:pid", petController.deletePetById);

export default router;