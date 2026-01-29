import userDAO from "../dao/userDao.js";

class UserService {
    async getAllUsers() {
        return await userDAO.getAll();
    }

    async getUserById(id) {
        const user = await userDAO.getById(id);
        if (!user) throw new Error("Usuario no encontrado");
        return user;
    }

    async createUser(data) {
        const { email, password } = data;

        if (!email || !password) {
            throw new Error("Email y password son obligatorios");
        }

        return await userDAO.create(data);
    }

    async updateUser(id, data) {
        const updated = await userDAO.updateById(id, data);
        if (!updated) throw new Error("Usuario no encontrado o no actualizado");
        return updated;
    }

    async deleteUser(id) {
        const deleted = await userDAO.deleteById(id);
        if (!deleted) throw new Error("Usuario no encontrado");
        return deleted;
    }
}

export default new UserService();