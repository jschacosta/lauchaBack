import  Router  from "express";
import {create,deleteMatch,getAllMatches, getByState, updateMany, updateMatch} from "../controllers/match.js";
import  validateParams  from "../middleware/validate.js";

const router = Router();

router.post("/match",create);
router.get("/match",getAllMatches);
router.get("/match-estado/:estado",getByState);
router.delete("/match/:id",deleteMatch);
router.delete("/match/:id",deleteMatch);
router.put("/match-rule",updateMatch);
router.put("/match-relato",updateMany);




export default router;