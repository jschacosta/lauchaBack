import Router from "express";
const router = Router();

import { sendTestEmail} from "../controllers/test.js";

//Email de prueba
router.get("/emailTest",sendTestEmail);


export default router;