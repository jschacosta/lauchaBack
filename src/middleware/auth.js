import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const verificarAuth = (req, res, next) => {
  const token = req.get("token");
  console.log(token);
  jwt.verify(token, process.env.TOKEN_ACTIVATE, (error, decoded) => {
    if (error) {
      return res.status(401).json({ mensaje: "Usuario no válido", error });
    }
    console.log(decoded.data);
    req.usuario = decoded.data; // el data viene del token generado en registro.js
    next();
  });
};
export const verificarAdmin = (req, res, next) => {
  const rol = req.usuario.role;
  if (rol === "ADMIN") {
    next();
  } else {
    return res.status(401).json({ mensaje: "Usuario no tiene permisos" });
  }
};
export const verificarEditor = (req, res, next) => {
  const rol = req.usuario.role;
  if (rol === "ADMIN" || rol === "EDITOR") {
    next();
  } else {
    return res.status(401).json({ mensaje: "Usuario no válido" });
  }
};
