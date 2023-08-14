import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';


const alertSchema = new Schema(
{
    title: { type: String, required: true },
    subtitle:{ type: String, ref: "Subtitle" },
    body: { type: String },
    from: {
        user: { type: String, ref: "User" },
        other: { type: String }
    },
    event: { type: String, ref: "Event"},
    isActive: { type: Boolean, default: false },
},
{ timestamps: true }
);



const Alert = mongoose.model("Alert", alertSchema);

export default Alert;
