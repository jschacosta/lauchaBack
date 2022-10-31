import  Router  from "express";
const router = Router();
import  validateParams  from "../middleware/validate.js";

import {
create,
} from "../controllers/user.js";

router.post(
    "/", 
    validateParams(
      [
        {
          param_key: "name",
          required: true,
          type: "object",
        },
        // {
        //   param_key: "lines",
        //   required: true,
        //   type: "array",
        // },
      ],
      "body"
    ),
    create
  );




export default router;