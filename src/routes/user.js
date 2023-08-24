import Router from "express";
const router = Router();
import validateParams from "../middleware/validate.js";

import { create, registerEmail, loginEmail, getById, getUsers, updateOne, activateMany, getUsersByService, deleteById } from "../controllers/user.js";

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
        type: "string",
      },
    ],
    "body"
  ),
  create
);

router.post(
  "/register",
  validateParams(
    [
      {
        param_key: "name",
        required: true,
        type: "string",
      },
      {
        param_key: "email",
        required: true,
        type: "string",
      },
      {
        param_key: "password",
        required: true,
        type: "string",
      },
    ],
    "body"
  ),
  registerEmail
);
router.post(
  "/loginEmail",
  validateParams(
    [
      {
        param_key: "email",
        required: true,
        type: "string",
      },
      {
        param_key: "password",
        required: true,
        type: "string",
      },
    ],
    "body"
  ),
  loginEmail
);

router.get(
    "/all",
    // validateParams(
    //   [
    //     {
    //       param_key: "body",
    //       required: true,
    //       type: "object",
    //     },
    //   ],
    //   "query"
    // ),
    getUsers
);

router.get(
  "/findService/:bodyParams",
  validateParams(
    [
      {
        param_key: "bodyParams",
        required: true,
        type: "string",
      },
    ],
    "query"
  ),
  getUsersByService
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
    validateParams(
      [
        {
          param_key: "name",
          required: false,
          type: "object",
        },
      ],
      "body"
    ),
    updateOne
);

router.put(
    "/active/many",
    validateParams(
      [
        {
          param_key: "users",
          required: true,
          type: "array",
        },
      ],
      "body"
    ),
    activateMany
);
router.delete(
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
  deleteById
  );

export default router;
