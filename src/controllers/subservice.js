
import Subservice from "../models/subservice.js";
import mongoose from "mongoose";
import { notFoundError, createError, missingData, duplicateData } from "../config/error.js";

//Crear subServicio
export const create = async (req, res, next) => {
  console.log("---CREATE NEW SUBSERVICE---",req.body)
  let subservice = new Subservice(req.body);
  subservice.name=req.body.name.toLowerCase()
  subservice.creator = req.body.user

  try{
    console.log("saving...", subservice)
    const newsubService= await subservice.save()
    console.log("casa")
    console.log("nuevo subservicio", newsubService)
    res.json(newsubService)
  }
  catch(err){
    next(err) 
    return res.status(400).send({
        status: 400,
        err:err,
        result: `Duplicate data ${subservice.name}`
      });
  }
};
//obtener los subservicios por servicio
export const getByService= async (req, res, next) => {
  console.log('---GET SUBSERVICES BY SERVICE---')
  let options = {
    // populate,
    select:"name ",
    page: Number(req.query.page)||1,
    limit:Number(req.query.limit)||50,
    sort:{ updatedAt: -1 },
  }
  let query={}
  query.isActive=true
  query.service=req.query.id
  console.log(query)
  try{
    Subservice.paginate(
      query,
      options,
      (err, items) => {
        if (err) return next(err);
        res.send(items);
      }
    );
  }
  catch (err) {
    next(err);
  }
};
//Obtener subService por id
export const getById= async (req, res, next) => {
  console.log('---GET SUBSERVICE BY ID---')
  Subservice.findOne({ _id: req.params.id })
  .exec((err, subService) => {
    if (err) return next(err);
    if (subService) {
      res.send(subService)
    } else {
      let error = createError(404, "subService notFound");
      console.log(error);
      return res.status(404).json(error);
    }
  });
};
//Obtener all services con paginate segun varias metricas
export const getAll= async (req, res, next) => {
    console.log('---GET ALL SUBSERVICES---')
    let query={}
    Object.assign(query, req.query);
    console.log("query", query)
  
    let options = {
      // populate,
      // select,
      page:query.page||1,
      limit:query.limit||50,
      sort:{ updatedAt: -1 },
    }
    try{
      Subservice.paginate(
        query,
        options,
        (err, items) => {
          if (err) return next(err);
          res.send(items);
        }
      );
    }
    catch (err) {
      next(err);
    }
};
//Actualizar data de un subservicio
export const updateOne = (req, res, next) => {
    console.log('---UPDATE SUBSERVICE---')
    let data = req.body;
    Subservice.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      data,
      {
        new: true,
      }
    )
      .exec((err, subService) => {
        if (err) return next(err);
        res.send(subService);
      });
}
//Activar o desactivar multiples usuarios
export const activateMany = (req, res, next) => {
    console.log(req.body)
    Subservice.updateMany(
      { _id: { $in: req.body.subServices } },
      { isActive: req.body.isActive?req.body.isActive:true }
    )
    .exec((err, data) => {
      if (err) next(err);
      res.send(data);
    });
    // res.send("buena")
};