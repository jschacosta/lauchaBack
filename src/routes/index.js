import express from "express";
const routes = express.Router();
import match from "./match.js";
import user from "./user.js";
import player from "./player.js";
import torneo from "./torneo.js";
import rules from "./rule.js";
import teams from "./team.js";
import players from "./player.js";
import { isAuth, isAdmin, isAuthOptional, renewToken } from "../config/auth.js";

routes.get("/isAuth", isAuth, (req, res) => {
  res.statusMessage = "authenticated";
  res.send(req.user.getUser());
});

routes.post("/renew", renewToken);

routes.use("/matches", match);
routes.use("/users", user);
routes.use("/api/players", player);
routes.use("/torneos", torneo);
routes.use("/rules", rules);

routes.use("/teams", teams);
routes.use("/players", players);

export default routes;
