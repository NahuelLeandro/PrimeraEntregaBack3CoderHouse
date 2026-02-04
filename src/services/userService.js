import userDAO from "../dao/userDao.js";
import CustomError from "../utils/CustomError.js";


class UserService {
    async getAllUsers() {
        //return await userDAO.getAll();
        const users = await userDAO.getAll();

        if (!users.length) {
            throw new CustomError("No hay usuarios cargados", 404);
        }

        return users;
    }

    async getUserById(id) {
        const user = await userDAO.getById(id);

        if (!user) {
            throw new CustomError("Usuario no encontrado", 404);
        }
        
        return user;
    }

    async createUser(data) {
        
        const { email, password } = data;
        if (!email || !password) {
            throw new CustomError("Email y password son obligatorios", 400);
        }

        const existingUser = await userDAO.getByEmail(email);
        if (existingUser) {
            throw new CustomError("Email ya registrado", 409);
        }

        return await userDAO.create(data);
    }

    async updateUser(id, data) {
        const updated = await userDAO.updateById(id, data);

        if (!updated) {
            throw new CustomError("Usuario no encontrado", 404);
        }

        return updated;
    }

    async deleteUser(id) {
        const deleted = await userDAO.deleteById(id);
        
        if (!deleted) {
            throw new CustomError("Usuario no encontrado", 404);
        }
        
        return deleted;
    }
}

export default new UserService();