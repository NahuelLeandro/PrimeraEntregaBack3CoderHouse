
import express from "express";
import { fork } from "child_process"

import userRoutes from "./userRoutes.js"
import petsRoutes from "./petRoutes.js"

import mockRouter from "./mocks.router.js";



const router = express.Router();

router.use("/api/mocks", mockRouter);
router.use("/api/users", userRoutes);
router.use("/api/pets", petsRoutes);



router.get("/operacionCompleja", (req , res)=>{
    
    const child = fork("./src/forks/operacionCompleja.js")    
    child.send("");//manda un mensaje a la operacion en este caso vacio
    child.on("compleja", result =>{ //golpeo "compleja" en el hijo
        console.log(result)
        res.send(result)
    })

})

router.get("/operacionSimple", (req , res)=>{
    res.send("Ok");
})






export default router;