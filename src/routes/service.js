import Router from "express";
const router = Router();
import validateParams from "../middleware/validate.js";

import { create, getServices, getById, updateOne, activateMany} from "../controllers/service.js";

router.post(
  "/",
  validateParams(
    [
      {
        param_key: "name",
        required: true,
        type: "string",
      }
    ],
    "body"
  ),
  create
);

router.get(
    "/allServices/:body",
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
    getServices
);

router.get(
"/:id",
validateParams(
    [
    {
        param_key: "id",
        required: true,
        type: "string",
    },
    ],
    "params"
),
getById
);

router.put(
    "/:id",
    validateParams(
      [
        {
          param_key: "id",
          required: true,
          type: "string",
        },
      ],
      "params"
    ),
    updateOne
);

router.put(
    "/active/many",
    validateParams(
      [
        {
          param_key: "services",
          required: true,
          type: "array",
        },
      ],
      "body"
    ),
    activateMany
);

export default router;