import  Router  from "express";
import {
    create,get
} from "../controllers/event.js";
import  validateParams  from "../middleware/validate.js";

const router = Router();
router.post("/", create);
router.get("/", get);


export default router;