import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from "mongoose-paginate-v2";
import paginateConfig from "../config/paginate.js";

const serviceSchema = new Schema(
  {
    name:{
        type: String,
        enum: ["barber", "yoga", "masseur"],
        unique: true
    },
    isActive: { type: Boolean, default:true },
    details:{type:String},
    imgUrl: {type:String},
    coverImg: {
      type: String,
      default: "",
    },
    creator:{ type: Boolean,ref:"User" },
  },
  { timestamps: true }
);

serviceSchema.plugin(mongoosePaginate);
mongoosePaginate.paginate.options = paginateConfig;
const Service= mongoose.model("Service", serviceSchema);
export default Service;


