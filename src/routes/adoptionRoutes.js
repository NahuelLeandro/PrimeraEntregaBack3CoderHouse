import express from "express";
import adoptionController from "../controllers/adoptionController.js";

const router = express.Router();

router.get("/", adoptionController.getAll);
router.get("/:aid", adoptionController.getById);
router.post("/", adoptionController.create);
router.put("/:aid/return", adoptionController.returnPet);
router.delete("/:aid", adoptionController.delete);

export default router;