
import Schedule from "../models/schedule.js";
import mongoose from "mongoose";
import { notFoundError, createError, missingData, duplicateData } from "../config/error.js";
import { time30Min, time45Min, time1Hour, time1Hour30, time2Hour } from "../lib/time.js";


//Crear usuario
export const create = async (req, res, next) => {
  console.log("---CREATE NEW SCHEDULE---")
  console.log(req.body)
  let schedule = new Schedule(req.body);
  console.log(schedule)
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
    return res.status(400).send({
        status: 400,
        result: `Duplicate data ${schedule.name}`
      });
  }
};