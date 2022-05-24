import express from "express";
const routes = express.Router();
import userNoAuth from "./userNoAuth.js";
  

routes.use("/", userNoAuth);


export default routes;