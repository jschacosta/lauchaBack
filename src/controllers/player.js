
import Player from "../models/player.js";
import mongoose from "mongoose";
import { notFoundError, createError, missingData, duplicateData } from "../config/error.js";

//Obtener jugadores
export const getAll = async (req, res, next) => {
    let body = req.query;
    try {
      var playerDB = await Player.findOne({"players.name":body});
      res.status(200).json(playerDB); 
    }   
    catch (error) {
      return res.status(500).json({mensaje: 'error al llenar los campos', error})
    }
  };

  export const create = async (req, res, next) => {
    body = req.body
    try {
      const body = {nombre:'esquema1'}
      const playerDB = await Player.create(body); //create verbo de mongo
      res.status(200).json(playerDB); 
    } 
    catch (error) {
      return res.status(500).json({mensaje: 'Ocurrio un error',error})
    }
  };  