import Router from "express";
import {
  createRule,
  getRules,
  updateRule,
  deleteRule,
} from "../controllers/rule.js";
import validateParams from "../middleware/validate.js";
import {
  verificarAuth,
  verificarAdmin,
  verificarEditor,
} from "../middleware/auth.js";
const router = Router();

router.get("/", [verificarAuth, getRules]);
router.post("/", [verificarAuth], createRule);
router.put("/:id", [verificarAuth, verificarEditor], updateRule);
router.delete("/:id", [verificarAuth, verificarEditor], deleteRule);

export default router;
