import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';

const scheduleSchema = new Schema(
  {
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
    hostel:{type:String, ref:"User"}
  },
  { timestamps: true }
);

const Schedule= mongoose.model("Schedule", scheduleSchema);
export default Schedule;


