
import Schedule from "../models/schedule.js";
import mongoose from "mongoose";
import { notFoundError, createError, missingData, duplicateData } from "../config/error.js";
import { time30Min, time45Min, time1Hour, time1Hour30, time2Hour } from "../lib/time.js";


//Crear horario
export const create = async (req, res, next) => {
  console.log("---CREATE NEW SCHEDULE---")
  let schedule = new Schedule(req.body);
  schedule.times.monday=req.body.monday
  schedule.times.tuesday=req.body.tuesday
  schedule.times.wednesday=req.body.wednesday
  schedule.times.thursday=req.body.thursday
  schedule.times.friday=req.body.friday
  schedule.times.saturday=req.body.saturday
  schedule.times.sunday=req.body.sunday
  try{
    console.log("saving...", schedule)
    const newSchedule= await schedule.save()
    console.log("nuevo horario", newSchedule)
    res.json(newSchedule)
  }
  catch(err){
    //console.log("El error: ",err.errors.hotel.properties.message)
    next(err)
  }
};
//Obtener horarios por hotel y si estan activos 
export const getSchedules= async (req, res, next) => {
    console.log('---GET SCHEDULES---')
    let body={}
    Object.assign(body, req.query);
    console.log("query", body)
    const populate = [
        {
          path: "hotel",
        //   select: "isActive name  email phone creator user imgUrl emails type",
        }
      ];
    let options = {
      populate,
      // select,
      page:body.page||1,
      limit:body.limit||50,
      sort:{ updatedAt: -1 },
    }
    let query={}
    body.isActive?query.isActive=body.isActive:""
    body.hotel?query.hotel=body.hotel:""
    try{
      Schedule.paginate(
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
console.log('---GET SCHEDULE BY ID---')
Schedule.findOne({ _id: req.params.id })
    .exec((err, schedule) => {
        schedule.populate(
            [
                {
                    path: "hotel",
                //   select: "isActive name  email phone creator user imgUrl emails type",
                }
            ]
        )
        if (err) return next(err);
        if (schedule) {
        res.send(schedule)
        } else {
        return next(createError(404, req.lg.user.notFound));
        }
    });
};