import Team from "../models/team.js";
import mongoose from "mongoose";
import {
  notFoundError,
  createError,
  missingData,
  duplicateData,
} from "../config/error.js";

//Obtener reglas
export const getTeams = async (req, res, next) => {
  console.log("--GET Teams--", req.body);
  try {
    let body = req.query;
    const cantidad = Object.keys(body);
    const arreglo = [];
    for (let item of cantidad) {
      arreglo.push(body[item]);
    }
    var teamDB = await Team.findOne({ nombre: "esquema1" });
    for (let i of arreglo) {
      teamDB = teamDB[i];
    }
    res.status(200).json(teamDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error al llenar los campos",
      error,
    });
  }
};
export const createTeam = async (req, res, next) => {
  console.log("--CREATE Team--", req.body);
  try {
    const body = { nombre: "esquema1" };
    const teamDB = await Team.create(body); //create verbo de mongo
    res.status(200).json(teamDB);
  } catch (error) {
    next(error);
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};

export const updateTeams = async (req, res, next) => {
  console.log("--UPDATE TEAM--", req.body);
  const body = {
    variables: req.body.variables, //variables:['seleccion','confederacion','mundial'],
    equipos: req.body.equipos, //['Manchester, Barcelona, inter'....]
  };
  var key = "";
  var key2 = "";
  for (let item of body.variables) {
    key = item + ".";
    key2 = key2 + key;
  }
  key2 = key2.slice(0, -1);
  const objeto = {};
  objeto[key2] = body.equipos;
  try {
    const teamDB = await Team.findOneAndUpdate({ nombre: "esquema1" }, objeto, {
      new: true,
    }); //create verbo de mongo
    res.status(200).json(teamDB);
  } catch (error) {
    next(error);
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
