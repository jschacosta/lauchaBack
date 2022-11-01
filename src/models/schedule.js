import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from "mongoose-paginate-v2";
import paginateConfig from "../config/paginate.js";

const scheduleSchema = new Schema(
  {
    hotel:{type:String, ref:"User", unique: true},
    times:{
        monday:{type:Array, default:[]},
        tuesday:{type:Array, default:[]},
        wednesday:{type:Array, default:[]},
        thursday:{type:Array, default:[]},
        friday:{type:Array, default:[]},
        saturday:{type:Array, default:[]},
        sunday:{type:Array, default:[]}
     },
    creator:{ type: Boolean,ref:"User" },
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


//Validate unique value message
scheduleSchema.plugin(uniqueValidator, { message: 'This {PATH} is already in use.' });
scheduleSchema.plugin(mongoosePaginate);
mongoosePaginate.paginate.options = paginateConfig;

const Schedule= mongoose.model("Schedule", scheduleSchema);
export default Schedule;


