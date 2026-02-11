
import express from "express";
import { fork } from "child_process"

import userRoutes from "./userRoutes.js"
import petsRoutes from "./petRoutes.js"
import adoptionRoutes from "./adoptionRoutes.js"

import mockRouter from "./mocks.router.js";



const router = express.Router();

router.use("/api/mocks", mockRouter);
router.use("/api/users", userRoutes);
router.use("/api/pets", petsRoutes);
router.use ("/api/adoptions", adoptionRoutes);



router.get("/operacionComplejaFork", (req , res)=>{
    const child = fork("./src/forks/operacionCompleja.js")    
    child.send("");//manda un mensaje a la operacion en este caso vacio
    child.on("compleja", result =>{ //golpeo "compleja" en el hijo
        console.log(result)
        res.send(result)
    })
})

/*para artillery
count = cantidad de usuarios
num = cantidad de veces que golpea el endpoint
-o simple.json = opcional para guardar el informe en un archivo
artillery quick --count 10 --num 5 "https://miapi.com/health"  -o simple.json
*/
router.get("/operacionCompleja", (req , res)=>{
    let sum = 0 ;
    for ( let i = 0 ; i < 5e8 ; i++ ) {
        sum += i ;
    }
    res.send({sum});
})

router.get("/operacionSimple", (req , res)=>{
    let sum = 0 ;
    for ( let i = 0 ; i < 1000000 ; i++ ) {
        sum += i ;
    }
    res.send({sum});
})






export default router;