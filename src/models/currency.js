import mongoose from "mongoose";
const Schema = mongoose.Schema;

const currencySchema = new Schema(
  {
    name: String,
    decimal: { type: String, enum: [",", "."] },
    thousand: { type: String, enum: [",", "."] },
    prefix: String,
    suffix: String,
    precision: { type: Number, min: 0, max: 10 },
    countryOrigin: String
  },
  { timestamps: true }
);


const Currency = mongoose.model("Currency", currencySchema);
export default Currency;
