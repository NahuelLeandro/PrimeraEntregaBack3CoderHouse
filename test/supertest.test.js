import { expect } from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectMongo from "../src/config/mongoConfig.js";

dotenv.config({ quiet: true });

const requester = supertest("http://localhost:8080");

describe("Test de endpoints PETS", function () {

    before(async function () {
        this.timeout(5000);
        await connectMongo(process.env.MONGO_URI_TEST);
    });

    beforeEach(async function () {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            await collections[key].deleteMany({});
        }
    });

    after(async function () {
        await mongoose.connection.close();
    });

    // ============================
    // CREATE
    // ============================

    describe("POST /api/pets", function () {

        it("Debe crear una mascota", async function () {

            const pet = {
                name: "Pitu",
                species: "dog",
                age: 5
            };

            const response = await requester.post("/api/pets").send(pet);

            expect(response.status).to.equal(201);
            expect(response.body.payload).to.have.property("_id");
            expect(response.body.payload.name).to.equal("Pitu");
        });

        it("Debe crear mascota con adopted = false por defecto", async function () {

            const pet = {
                name: "Luna",
                species: "cat",
                age: 3
            };

            const response = await requester.post("/api/pets").send(pet);

            expect(response.body.payload.adopted).to.equal(false);
        });

        it("Debe fallar si faltan campos obligatorios", async function () {

            const badPet = { name: "ErrorPet" };

            const response = await requester.post("/api/pets").send(badPet);

            expect(response.status).to.equal(400);
        });

    });

    // ============================
    // GET ALL
    // ============================

    describe("GET /api/pets", function () {

        it("Debe devolver arreglo de mascotas", async function () {

            const response = await requester.get("/api/pets");

            expect(response.body).to.have.property("status");
            expect(response.body.payload).to.be.an("array");
        });

    });

    // ============================
    // GET BY ID
    // ============================

    describe("GET /api/pets/:id", function () {

        it("Debe obtener mascota por ID", async function () {

            const pet = { name: "Max", species: "dog", age: 4 };

            const created = await requester.post("/api/pets").send(pet);

            const response = await requester.get(`/api/pets/${created.body.payload._id}`);

            expect(response.status).to.equal(200);
            expect(response.body.payload.name).to.equal("Max");
        });

        it("Debe devolver 404 si no existe", async function () {

            const fakeId = new mongoose.Types.ObjectId();

            const response = await requester.get(`/api/pets/${fakeId}`);

            expect(response.status).to.equal(404);
        });

    });

    // ============================
    // DELETE
    // ============================

    describe("DELETE /api/pets/:id", function () {

        it("Debe eliminar una mascota", async function () {

            const pet = { name: "DeleteMe", species: "dog", age: 2 };

            const created = await requester.post("/api/pets").send(pet);

            const del = await requester.delete(`/api/pets/${created.body.payload._id}`);

            expect(del.status).to.equal(200);

            const check = await requester.get(`/api/pets/${created.body.payload._id}`);

            expect(check.status).to.equal(404);
        });

    });

});