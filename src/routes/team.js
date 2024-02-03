import Router from "express";

import validateParams from "../middleware/validate.js";
import {
  verificarAuth,
  verificarAdmin,
  verificarEditor,
} from "../middleware/auth.js";
import { getTeams, createTeam, updateTeams } from "../controllers/team.js";
const router = Router();

router.get("/", [getTeams]);
router.post("/", createTeam);
router.put("/", updateTeams);

export default router;
