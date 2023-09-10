import  Router  from "express";
import { aprovedOrder, createOrder } from "../controllers/payment.js";
const router = Router();
export default router;

router.post(
    "/newOrder",
    createOrder
);
router.post(
    "/approvedOrder",
    aprovedOrder
);