import  Router  from "express";
import {
    create
} from "../controllers/calendar.js";
import  validateParams  from "../middleware/validate.js";

const router = Router();
router.post("/hola", create);


export default router;