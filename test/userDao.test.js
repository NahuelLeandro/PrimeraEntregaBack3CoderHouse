import userDao from "../src/dao/userDao.js";
import connectMongo from "../src/config/mongoConfig.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { expect } from "chai";
import { faker } from "@faker-js/faker";

dotenv.config({ quiet: true });

describe("Test DAO Usuarios", function () {

    before(async function () {
        this.timeout(5000);
        await connectMongo(process.env.MONGO_URI_TEST);
    });

    beforeEach(async function () {
        await mongoose.connection.collections.users.deleteMany({});
    });

    after(async function () {
        await mongoose.connection.close();
    });

    it("getAll() debe devolver un arreglo", async () => {
        const result = await userDao.getAll();
        expect(result).to.be.an("array");
    });

    it("create() debe guardar correctamente un usuario", async () => {

        const fakeUser = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const result = await userDao.create(fakeUser);

        expect(result.first_name)
            .to.be.a("string")
            .that.is.equal(fakeUser.first_name)
            .that.is.a("string");
        expect(result.last_name)
            .to.be.a("string")
            .that.is.equal(fakeUser.last_name)
            .that.is.a("string");
        expect(result.email)
            .to.be.a("string")
            .that.is.equal(fakeUser.email)
            .that.is.a("string");
        expect(result.password)
            .to.be.a("string")
            .that.is.equal(fakeUser.password)
            .that.is.a("string");
        expect(result.role)
            .to.be.a("string");
    });

    it("create() debe crear usuario con pets vacío por defecto", async () => {

        const fakeUser = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const result = await userDao.create(fakeUser);

        expect(result).to.have.property("pets");
        expect(result.pets)
            .to.be.an("array")
            .that.is.empty;
    });

    it("getByEmail() debe obtener usuario por email", async () => {

        const fakeUser = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const created = await userDao.create(fakeUser);
        const found = await userDao.getByEmail(created.email);

        expect(found.email).to.equal(created.email);
    });

    it("getById() debe retornar un objeto", async () => {

        const fakeUser = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const created = await userDao.create(fakeUser);
        const found = await userDao.getById(created._id);

        expect(found).to.be.an("object");
    });

    it("deleteById() debe eliminar el usuario", async () => {

        const fakeUser = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const created = await userDao.create(fakeUser);
        const deleted = await userDao.deleteById(created._id);
        const afterDelete = await userDao.getById(created._id);

        expect(deleted).to.be.an("object");
        expect(afterDelete).to.be.null;
    });

});