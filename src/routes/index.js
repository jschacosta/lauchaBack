import express from "express";
const routes = express.Router();
import event from "./event";
import service from "./service";
import user from "./user";
import notification from "./notification";
import schedule from "./schedule";
import { isAuth, isAdmin, isAuthOptional } from "../config/auth.js";


routes.get("/isAuth", isAuth, (req, res) => {
    res.statusMessage = "authenticated";
    res.send(req.user.getUser());
  });

routes.use("/events", event)
routes.use("/eventsAuth", isAuth, event)
routes.use("/eventsAdmin", isAuth, isAdmin, event)

routes.use("/serviceAdmin", isAuth, isAdmin, service)

routes.use("/userAdmin", isAuth, isAdmin, user)

routes.use("/notification", notification)

routes.use("/schedule", schedule)


export default routes;