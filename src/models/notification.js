import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';


const notificationSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    from: {
      user: { type: String, ref: "User" },
      other: { type: String }
    },
    user: { type: String, ref: "User" },
    users: Array({ type: String, ref: "User" }),
    event: { type: String, ref: "Event"  },
    isRead: { type: Boolean, default: false },
    subtitle:{ type: String, ref: "Subtitle" },
  },
  { timestamps: true }
);



const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
