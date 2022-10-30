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
      last: {
        type: String,
      },
      nickName:{
        type:String
      }
    },
    phone:{type: String},
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    imgUrl: String,
    coverImg: {
      type: String,
      default: "",
    },
    lastLogin: Date,
    businessData:{
      city:{type: String},
      type:{
        type: String, 
      default: "personal",
      enum: ["hotel", "hostel", "other"],
      },
      name:{type: String},
      location:{type: String},
      owner:{
        name: {
          first: {
            type: String,
          },
          last: {
            type: String,
          },
        },
      }  
    },
    type: {
      type: String,
      default: "personal",
      enum: ["personal", "business", "admin", "worker"],
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
User.validPassword = async (id, password) => {
  const user = await User.findById(id, "password").exec();
  let valid = false;
  try {
    valid = bcrypt.compareSync(password, user.password);
  } catch (err) {
    valid = false;
  }

  return valid;
};