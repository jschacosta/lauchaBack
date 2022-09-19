import dotenv from "dotenv";
dotenv.config();

export default function envar() {
  const env = process.env.NODE_ENV;
  const dbs = new Map();
  dbs.set("dev", process.env.DB_DEV);
  dbs.set("test", process.env.DB_DEV);
  dbs.set("production", process.env.DB_PROD);
  return {
    SECRET: process.env.SECRET,
    // DB_PASS: process.env.DB_PASS,
    // DB_USER: process.env.DB_USER
  };
}