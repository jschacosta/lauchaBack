import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';

const scheduleSchema = new Schema(
  {
    hotel:{type:String, ref:"User"},
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

const Schedule= mongoose.model("Schedule", scheduleSchema);
export default Schedule;


