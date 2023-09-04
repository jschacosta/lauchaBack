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
  "/get/all",
    validateParams(
      [
        {
          param_key: "isActive",
          required: false,
          type: "string",
        },
        {
          param_key: "limit",
          required: false,
          type: "string", // Dependiendo de si limit es un número o no
        },
        {
          param_key: "page",
          required: false,
          type: "string", // Dependiendo de si page es un número o no
        },
      ],
      "query"
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