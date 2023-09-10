import { captureOrder, createOrderPaypal } from "../services/paypal.js";


export const createOrder = async (req, res, next) => {
    console.log("--CREATE ORDER--", req.body)
    let data = req.body

    let response =await createOrderPaypal(data);
    console.log(response.data)
    res.send(response.data);
}

export const aprovedOrder = async (req, res, next) => {
    console.log("--APROVED ORDER--")
    let data = req.body
    let response =await captureOrder(data);
    console.log("logrado", response.data)
    res.send(response.data);
}