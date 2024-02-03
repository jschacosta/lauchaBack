import  Router  from "express";
import {create, deleteOne, edition, findOne, updateOne} from "../controllers/torneo.js";
import  validateParams  from "../middleware/validate.js";

const router = Router();

router.post("/torneos",create);
router.get("/find",findOne);
router.delete("/torneos/:id",deleteOne);
router.put("/torneos/",updateOne);
router.put("/torneos-confirmar",edition);




    
export default router;