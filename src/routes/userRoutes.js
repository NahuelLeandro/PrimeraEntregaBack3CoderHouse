import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

// 👤 Endpoints de Usuarios

router.get("/", userController.getAllUsers);
router.get("/:uid", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:uid", userController.updateUserById);
router.delete("/:uid", userController.deleteUserById);

export default router;