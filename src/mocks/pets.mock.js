import { faker } from "@faker-js/faker";

export const generateMockPets = (quantity = 50) => {
    return Array.from({ length: quantity }, () => ({
        _id: faker.database.mongodbObjectId(),
        name: faker.animal.petName(),
        species: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 15 })
    }));
};