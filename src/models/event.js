import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';

const eventSchema = new Schema(
  {
    isActive: { type: Boolean, default:true },
    isValidate:{type: Boolean, default:false},
    title: {type:String},
    start: {type: String},
    end: {type: String},
    details:{type:String},
    imgUrl: {type:String},
    service:{ type: String, ref: "Service" },
    employee:{ type: String, ref: "User" },
    coverImg: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "waiting",
      enum: ["waiting", "approved", "canceled", "finished" ],
    },
  },
  { timestamps: true }
);

const Event= mongoose.model("Event", eventSchema);
export default Event;


