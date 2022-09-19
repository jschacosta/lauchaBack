import  Router  from "express";
import {
    test, 
    registerEmail
} from "../controllers/user.js";
import  validateParams  from "../middleware/validate.js";

const router = Router();
router.get("/", test);
router.post(
    "/registerEmail",
    validateParams(
        [ 
          {
            param_key: "email",
            required: true,
            type: "string",
          },
        //   {
        //     param_key: "state",
        //     enum: ["budget", "request", "opportunity", "business"],
        //     required: true,
        //     type: "string",
        //   },
        {
            param_key: "password",
            required: true,
            type: "string",
          },
        ],
    "body"
    ),
    registerEmail)

export default router;