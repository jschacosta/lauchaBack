import express from "express";
const routes = express.Router();
import userNoAuth from "./userNoAuth.js";
import calendar from "./calendar.js";
import { isAuth, isAuthOptional } from "../config/auth.js";


routes.get("/isAuth", isAuth, (req, res) => {
    res.statusMessage = "authenticated";
    res.send(req.user.getUser());
  });

routes.use("/", userNoAuth);
routes.use("/calendar", isAuth, calendar)
// routes.use("/events", isAuth, events)


export default routes;