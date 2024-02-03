import Torneo from "../models/torneo.js";
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
    const array = [];
    const torneoDB = await Torneo.create(body); //create verbo de mongo
    array.push(torneoDB);
    res.status(200).json(array);
  } catch (error) {
    next(error);
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Obtener Torneo
export const findOne = async (req, res, next) => {
  try {
    var torneoDB = await Torneo.find();

    const array = [];
    for (let item of torneoDB[0].matches) {
      array.push(item._id);
      torneoDB[0].reglasFinal.push(item.valorApuestaRegla);
    }
    const partidoDB = await Match.find({ _id: { $in: array } });
    torneoDB[0].matches = partidoDB;
    console.log("va");
    console.log(torneoDB);
    res.status(200).json(torneoDB);
  } catch (error) {
    next(error);
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Obtener by ID
export const deleteOne = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const torneoDB = await Torneo.findByIdAndDelete({ _id }); //create verbo de mongo
    res.status(200).json(torneoDB);
  } catch (error) {
    next(error);
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Obtener by ID
export const updateOne = async (req, res, next) => {
  const newTorneo = req.body;
  const _id = newTorneo._id;
  try {
    const torneoDB = await Torneo.findByIdAndUpdate(_id, newTorneo, {
      new: true,
    });

    res.status(200).json(torneoDB);
  } catch (error) {
    next(error);
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
//Obtener by ID
export const edition = async (req, res, next) => {
  const newTorneo = req.body;
  const _id = newTorneo._id;
  try {
    const torneo1 = await Torneo.find();
    if (torneo1[0].edition === "false") {
      res.status(200).json("false");
    }
    if (torneo1[0].edition != "false") {
      const torneoDB = await Torneo.findByIdAndUpdate(_id, newTorneo, {
        new: true,
      });
      res.status(200).json(torneoDB);
    }
  } catch (error) {
    next(error);
    return res.status(500).json({
      mensaje: "Ocurrio un error",
      error,
    });
  }
};
