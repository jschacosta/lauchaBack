import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';

const eventSchema = new Schema(
  {
    isActive: {type: Boolean, default: true },
    title: {type:String, default:""},
    details: {type:String},
    service: {type: String, ref: "Service" },
    worker: {type: String, ref: "User" },
    hotel: {type: String, ref: "User" },
    scheduled:{
      date: {type: String},
      startTime: {type: String},
      endTime: {type: String},
    },
    coverImg: {type: String, default: "",},
    status: {
      type: String,
      default: "requested",
      enum: ["requested", "matched", "canceled", "completed", "failed" ],
    },
    observations:Array({
      creator: { type: String, ref: "User" },
      observation: Array({ type: String , default: null}), 
    }),
  },
  { timestamps: true }
);

const Event= mongoose.model("Event", eventSchema);
export default Event;


