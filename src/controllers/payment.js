import { createOrderPaypal } from "../services/paypal.js";


export const createOrder = async (req, res, next) => {
    console.log("--CREATE ORDER--", req.body)
    await createOrderPaypal(req.body);
    res.send("email sent");
}

