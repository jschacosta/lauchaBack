import  Router  from "express";
import {test, testPost} from "../controllers/user.js";

const router = Router();
router.get("/", test);
router.post("/", testPost);

export default router;