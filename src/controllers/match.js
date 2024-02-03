import Match from "../models/match.js";
import mongoose from "mongoose";
import {
  notFoundError,
  createError,
  missingData,
  duplicateData,
} from "../config/error.js";

//Crear Partido
export const create = async (req, res, next) => {
  const body = req.body;
  try {
    const partidoDB = await Match.create(body); //create verbo de mongo
    res.status(200).json(partidoDB);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Ruta tipo Get sin parámetros (entrega todos los documentos)
export const getAllMatches = async (req, res, next) => {
  try {
    const partidosDb = await Match.find();
    res.json(partidosDb);
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Ruta tipo Get con parametro (entrega documentos segun estado del partido, por jugar, jugando, etc)
export const getByState = async (req, res, next) => {
  console.log("--MATCH ESTADO--");
  try {
    const body = req.params.estado;
    var array = body.split("&");
    console.log("array", array);
    if (array.length === 2) {
      const dos = array[1].replace(/["" -]/g, function (m) {
        // m is the match found in the string
        // If `,` is matched return `.`, if `.` matched return `,`
        return m === "-" ? " " : "-";
      });
      const partidosDb = await Match.find({ estado: { $in: [array[0], dos] } });
      res.json(partidosDb);
    }
    if (array.length === 3) {
      const dos = array[1].replace(/["" -]/g, function (m) {
        return m === "-" ? " " : "-";
      });
      const tres = array[2].replace(/["" -]/g, function (m) {
        return m === "-" ? " " : "-";
      });
      const partidosDb = await Match.find({
        estado: { $in: [array[0], dos, tres] },
      });
      res.json(partidosDb);
    }
    if (array.length === 1) {
      const uno = array[0].replace(/["" -]/g, function (m) {
        return m === "-" ? " " : "-";
      });
      const partidosDb = await Match.find({ estado: uno });
      res.json(partidosDb);
    }
  } catch (error) {
    return res.status(400).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Delete Match
export const deleteMatch = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const partidoDb = await Match.findByIdAndDelete({ _id });
    if (!partidoDb) {
      return res.status(400).json({
        mensaje: "No se encontró el id indicado",
        error,
      });
    }
    res.json(partidoDb);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Actualizar partido
export const updateMatch = async (req, res, next) => {
  try {
    const body = req.body;
    const _id = body._id;
    const matchDB = await Match.findByIdAndUpdate(_id, body, { new: true });
    res.status(200).json(matchDB);
  } catch (error) {
    return res
      .status(400)
      .json({ mensaje: "Ocurrió un error al actualizar", error });
  }
};

//Actualizar varios partido
export const updateMany = async (req, res, next) => {
  try {
    const body = req.body;
    let arreglo = [];
    for (let partido of body) {
      let partidoNuevo = await Match.findByIdAndUpdate(partido._id, partido, {
        new: true,
      });
      arreglo.push(partidoNuevo);
    }
    res.status(200).json(arreglo);
  } catch (error) {
    return res.status(400).json({ mensaje: "Ocurrió un error al actualizar" });
  }
};
