import { faker } from "@faker-js/faker";

export const generateMockUsers = (quantity = 50) => {
    return Array.from({ length: quantity }, () => ({
        _id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: "coder123",
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: []
    }));
};