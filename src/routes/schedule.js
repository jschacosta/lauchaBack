import  Router  from "express";
const router = Router();

import validateParams from "../middleware/validate.js";

import { create, getSchedules, getById} from "../controllers/schedule.js";

router.post(
    "/",
    validateParams(
        [
        {
            param_key: "id",
            required: true,
            type: "string",
        },
        {
            param_key: "monday",
            required: true,
            type: "array",
        },
        {
            param_key: "tuesday",
            required: true,
            type: "array",
        },
        {
            param_key: "wednesday",
            required: true,
            type: "array",
        },
        {
            param_key: "thursday",
            required: true,
            type: "array",
        },
        {
            param_key: "friday",
            required: true,
            type: "array",
        },
        {
            param_key: "saturday",
            required: true,
            type: "array",
        },
        {
            param_key: "sunday",
            required: true,
            type: "array",
        },
        ],
    "body"
    ),
    create
);
router.get(
    "/allSchedules/:body",
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
    getSchedules
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


export default router;