import  Router  from "express";
import { createOrder } from "../controllers/payment.js";
const router = Router();
export default router;

router.post(
    "/newOrder",
    createOrder
);