import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';

const scheduleSchema = new Schema(
  {
    hostel:{type:String, ref:u},
    times:{
        monday:{type:Array},
        tuesday:{type:Array},
        wednesday:{type:Array},
        thursday:{tyep:Array},
        friday:{type:Array},
         saturday:{type:Array},
         sunday:{type:Array}
     },
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

const Service= mongoose.model("Schedule", scheduleSchema);
export default Schedule;


