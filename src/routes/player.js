import  Router  from "express";
import  validateParams  from "../middleware/validate.js";
import { create, getAll } from "../controllers/player.js";

const router = Router();


router.get("/players",getAll);
router.post("/players",create);





export default router;