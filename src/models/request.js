import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';

const eventSchema = new Schema(
  {
    name: {
        first: {
          type: String,
        },
        last: {
          type: String,
        }
      },
    email: {type: String},
    phone: {type:String},
    city:{type:String},
    nacionality:{type:String},
    service:{ type: String, ref: "Service" }
  },
  { timestamps: true }
);

const Request= mongoose.model("Request", eventSchema);
export default Request;


