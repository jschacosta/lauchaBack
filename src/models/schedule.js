import mongoose from "mongoose";
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    ref: {type: String, ref: "User" },
    location: {type: String}, 
    schedules: [
      {
        dayOfWeek: {
          type: Number,
          required: true,
          min: 0,
          max: 6
        },
        availableIntervals: [
          {
            startTime: {
              type: String,
              required: true
            },
            endTime: {
              type: String,
              required: true
            }
          }
        ]
      }
    ],
    unavailableIntervals: [
      {
        startTime: {
          type: String,
          required: true
        },
        endTime: {
          type: String,
          required: true
        }
      }
    ],
    creator:{ type: Boolean,ref:"User" },
    isActive: { type: Boolean, default:true },
    details:{type:String},
  },
  { timestamps: true }
);


const Schedule = mongoose.model("Schedule", scheduleSchema);
export default Schedule;


