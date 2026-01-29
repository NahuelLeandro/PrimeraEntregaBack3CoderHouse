import userService from "../services/userService.js";

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json({ status: "success", payload: users });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.uid);
            res.json({ status: "success", payload: user });
        } catch (error) {
            res.status(404).json({ status: "error", message: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const created = await userService.createUser(req.body);
            res.status(201).json({ status: "success", payload: created });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async updateUserById(req, res) {
        try {
            const updated = await userService.updateUser(req.params.uid, req.body);
            res.json({ status: "success", payload: updated });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async deleteUserById(req, res) {
        try {
            const deleted = await userService.deleteUser(req.params.uid);
            res.json({ status: "success", payload: deleted });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}

export default new UserController();