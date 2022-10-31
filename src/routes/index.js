import express from "express";
const routes = express.Router();
import event from "./event.js";
import service from "./service.js";
import user from "./user.js";
import notification from "./notification.js";
import schedule from "./schedule.js";
import { isAuth, isAdmin, isAuthOptional } from "../config/auth.js";


routes.get("/isAuth", isAuth, (req, res) => {
    res.statusMessage = "authenticated";
    res.send(req.user.getUser());
  });

routes.use("/events", event)
routes.use("/eventsAuth", isAuth, event)
routes.use("/eventsAdmin", isAuth, isAdmin, event)

routes.use("/serviceAdmin", isAuth, isAdmin, service)
routes.use("/services", service)

routes.use("/users", user)
routes.use("/userAdmin", isAuth, isAdmin, user)

routes.use("/notification", notification)

routes.use("/schedule", schedule)


export default routes;