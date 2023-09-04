
import Service from "../models/service.js";
import mongoose from "mongoose";
import { notFoundError, createError, missingData, duplicateData } from "../config/error.js";

//Crear Servicio
export const create = async (req, res, next) => {
  console.log("---CREATE NEW SERVICE---",req.user)
  let service = new Service(req.body);
  service.name=req.body.name.toLowerCase()
  service.creator = req.body.user

  try{
    if(err) return err
    console.log("saving...", service)
    const newService= await service.save()
    console.log("nuevo servicio", newService)
    res.json(newService)
  }
  catch(err){
    next(err) 
    return res.status(400).send({
        status: 400,
        err:err,
        result: `Duplicate data ${service.name}`
      });
  }
};
//Obtener servicios con paginate por tipos y activados
export const getServices= async (req, res, next) => {
    console.log('---GET SERVICES---')
    let body={}
    Object.assign(body, req.query);
    console.log("query", body)
  
    let options = {
      // select,
      page:body.page||1,
      limit:body.limit||50,
      sort:{ updatedAt: -1 },
    }
    let query={}
    body.isActive?query.isActive=body.isActive:""
    try{
      Service.paginate(
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
//Obtener usuario por ID
export const getById= async (req, res, next) => {
    console.log('---GET SERVICE BY ID---')
    Service.findOne({ _id: req.params.id })
    .exec((err, user) => {
      if (err) return next(err);
      if (user) {
        res.send(user)
      } else {
        return next(createError(404, req.lg.user.notFound));
      }
    });
};
//Actualizar data de un usuario
export const updateOne = (req, res, next) => {
    console.log('---UPDATE SERVICE---')
    let data = req.body;
    Service.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      data,
      {
        new: true,
      }
    )
      .exec((err, service) => {
        if (err) return next(err);
        res.send(service);
      });
}
//Activar o desactivar multiples usuarios
export const activateMany = (req, res, next) => {
    console.log(req.body)
    Service.updateMany(
      { _id: { $in: req.body.services } },
      { isActive: req.body.isActive?req.body.isActive:true }
    )
    .exec((err, data) => {
      if (err) next(err);
      res.send(data);
    });
    // res.send("buena")
};