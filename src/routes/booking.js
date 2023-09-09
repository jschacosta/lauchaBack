import  Router  from "express";
import {create,getById, getBookings, updateOne} from "../controllers/booking.js";
import  validateParams  from "../middleware/validate.js";

const router = Router();

router.post(
    "/",
    validateParams(
        [
        {
            param_key: "scheduled",
            required: true,
            type: "object",
        },
        {
            param_key: "service",
            required: true,
            type: "string",
        },
        {
            param_key: "hotel",
            required: true,
            type: "string",
        },
        {
            param_key: "client",
            required: true,
            type: "string",
        }
        ],
    "body"
    ),
    create
);

router.get(
    "/allBookings/:body",
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
    getBookings
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


export default router;