import express from "express";
const routes = express.Router();
import booking from "./booking.js";
import service from "./service.js";
import user from "./user.js";
import notification from "./notification.js";
import schedule from "./schedule.js";
import { isAuth, isAdmin, isAuthOptional } from "../config/auth.js";


routes.get("/isAuth", isAuth, (req, res) => {
    res.statusMessage = "authenticated";
    res.send(req.user.getUser());
  });

routes.use("/booking", booking)
routes.use("/bookingAuth", isAuth, booking)
routes.use("/boookingAdmin", isAuth, isAdmin, booking)

routes.use("/serviceAdmin", isAuth, isAdmin, service)
routes.use("/services", isAuth, service)


routes.use("/users", user)
routes.use("/userAdmin", isAuth, isAdmin, user)

routes.use("/notification", notification)

routes.use("/schedules", schedule)


export default routes;