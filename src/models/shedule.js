import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';

const serviceSchema = new Schema(
  {
    hostel:{type:String, ref:u},
    isActive: { type: Boolean, default:true },
    details:{type:String},
    imgUrl: {type:String},
    coverImg: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Service= mongoose.model("Service", serviceSchema);
export default Service;


