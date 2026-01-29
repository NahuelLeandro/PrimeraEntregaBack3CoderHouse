// import express from "express";
// import {faker} from "@faker-js/faker";



// const router = express.Router();


// const generateUsers = (cant) => {

//     const users = Array.from({length: cant} , ()=> ({
//         _id : faker.database.mongodbObjectId(),
//         name: faker.person.firstName(),
//         age: faker.number.int({min: 18 , max: 60}),
//         email: faker.internet.email(),
//         password: "coder123"
//     }))

//     return users;
// }


// const generatePets = (cant) => {

//     const pets = Array.from({length: cant} , ()=> ({
//         _id : faker.database.mongodbObjectId(),
//         name: faker.person.firstName(),
//         age: faker.number.int({min: 1 , max: 20}),
//         species: faker.animal.type(),
//     }))

//     return pets;
// }




// router.get("/mockingpets/:cant" , (req, res) => {
    
//     const { cant = 50 } = req.params;

//     const pets = generatePets(cant);

//     res.send(pets);
// })

// router.get("/mockingusers/:cant" , (req, res) => {
    
//     const { cant = 50 } = req.params;

//     const users = generateUsers(cant);

//     res.send(users);
// })


// router.post("/generateData/:cantUser/:cantPet", (req,res)=>{
//     const { cantUser = 50 } = req.params;
//     const { cantPet = 50 } = req.params;
//     const users = generateUsers(cantUser);
//     const pets = generatePets(cantPet);


//     res.send("Data generated successfully")
// })





// export default router;



import express from "express";
import { generateMockUsers } from "../mocks/users.mock.js";
import { generateMockPets } from "../mocks/pets.mock.js";
import userDAO from "../dao/userDao.js";
import petDAO from "../dao/petDao.js";


const router = express.Router();

/* GET /api/mocks/mockingusers */
router.get("/mockingusers", (req, res) => {
    const users = generateMockUsers(50);
    res.status(200).json(users);
});

/* GET /api/mocks/mockingpets */
router.get("/mockingpets", (req, res) => {
    const pets = generateMockPets(50);
    res.status(200).json(pets);
});

/* POST /api/mocks/generateData */
router.post("/generateData", async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

        const mockUsers = generateMockUsers(users);
        const mockPets = generateMockPets(pets);

        await userDAO.insertMany(mockUsers);
        await petDAO.insertMany(mockPets);

        res.status(201).json({
        status: "success",
        insertedUsers: mockUsers.length,
        insertedPets: mockPets.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        status: "error",
        message: "Error generating data"
        });
    }
});

export default router;