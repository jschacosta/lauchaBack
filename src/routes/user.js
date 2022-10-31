import Router from "express";
const router = Router();
import validateParams from "../middleware/validate.js";

import { create, getUsers } from "../controllers/user.js";

router.post(
  "/",
  validateParams(
    [
      {
        param_key: "name",
        required: true,
        type: "object",
      },
      {
        param_key: "password",
        required: true,
        type: "array",
      },
    ],
    "body"
  ),
  create
);

router.get(
    "/:body",
    validateParams(
      [
        {
          param_key: "body",
          required: true,
          type: "string",
        },
      ],
      "params"
    ),
    getUsers
  );

export default router;
