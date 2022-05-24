import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    isActive: { type: Boolean },
    petitioner: { type: String},
    receptor: { type: String}
  },
  { timestamps: true }
);

const User= mongoose.model("User", userSchema);
export default User;