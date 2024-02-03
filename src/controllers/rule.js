import Rule from "../models/rule.js";
import mongoose from "mongoose";
import {
  notFoundError,
  createError,
  missingData,
  duplicateData,
} from "../config/error.js";

//Obtener reglas
export const getRules = async (req, res, next) => {
  console.log("--GET RULES--", req.body);
  try {
    const ruleDb = await Rule.find();
    res.json(ruleDb);
  } catch (error) {
    next(error);
    return res.status(500).json({ mensaje: "Ocurrio un error", error });
  }
};
//Crear regla
export const createRule = async (req, res, next) => {
  console.log("--CREATE RULE--", req.body);
  try {
    const body = req.body;
    console.log(body);
    const ruleDB = await Rule.create(body); //create verbo de mongo
    res.status(200).json(ruleDB);
  } catch (error) {
    next(error);
    return res.status(500).json({ mensaje: "Ocurrio un error", error });
  }
};

export const updateRule = async (req, res, next) => {
  console.log("--UPDATE RULE--", req.body);
  try {
    const _id = req.params.id;
    const body = req.body;
    const ruleDB = await Rule.findByIdAndUpdate(_id, body, { new: true });
    res.status(200).json(ruleDB);
  } catch (error) {
    next(error);
    return res
      .status(500)
      .json({ mensaje: "Ocurrió un error al actualizar", error });
  }
};

export const deleteRule = async (req, res, next) => {
  console.log("--DELETE RULE--", req.body);
  try {
    const _id = req.params.id;
    const ruleDb = await Rule.findByIdAndDelete({ _id });
    if (!ruleDb) {
      return res
        .status(400)
        .json({ ruleDb, mensaje: "No se encontró el id indicado", error });
    }
    res.json(ruleDb);
  } catch (error) {
    next(error);
    return res.status(500).json({ mensaje: "Ocurrio un error", error });
  }
};
