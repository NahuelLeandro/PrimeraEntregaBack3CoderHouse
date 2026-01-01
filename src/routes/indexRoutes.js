
import express from "express";

import mockRouter from "./mocks.router.js";

const router = express.Router();

router.use("/api/mocks", mockRouter);



export default router;