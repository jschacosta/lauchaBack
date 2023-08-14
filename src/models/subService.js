import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';
import mongoosePaginate from "mongoose-paginate-v2";
import paginateConfig from "../config/paginate.js";

const subServiceSchema = new Schema(
{
    name:{type: String},
    service:{type:String, ref:"User"},
    isActive: { type: Boolean, default:true },
    icon:{type:String},
    details:{type:String},
    imgUrl: {type:String},
    coverImg: {type: String,},
    creator:{ type: String,ref:"User"},
    updated:{
        updatedAt: {
            type: Date,
            default: new Date(),
        },
        updatedBy:{ type: String,ref:"User"},
    },
    price:{
        value:{type: String,default: "$ 0"},
        lastValue:{type: String,default: "$ 0"},
        number:{type: Number,default: 0},
        lastNumber:{type: Number,default: 0},
    }
},
{ timestamps: true }
);

subServiceSchema.plugin(mongoosePaginate);
mongoosePaginate.paginate.options = paginateConfig;
const SubService= mongoose.model("SubService", subServiceSchema);
export default SubService;


