import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);


const userSchema = new Schema(
  {
    isActive: { type: Boolean, default:true },
    isValidate:{type: Boolean, default:false},
    password: {
      type: String,
      select: false,
      trim:true, 
      minlength: 6, 
      required:[true, 'Password requiere']
    },
    name: {
      first: {
        type: String,
      },
      middle: {
        type: String,
      },
      last: {
        type: String,
      },
      secondLast: {
        type: String,
      },
      nickName:{
        type:String
      }
    },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);



//Validate unique value message
userSchema.plugin(uniqueValidator, { message: 'This {PATH} is already in use.' });




const User= mongoose.model("User", userSchema);
export default User;



// Functions custom for model

User.hash = (password) => {
  return bcrypt.hashSync(password, salt, null);
};