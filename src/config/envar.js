import dotenv from "dotenv";
dotenv.config();

export default function envar() {
  process.env.NODE_ENV = process.env.NODE_ENV.trim();

  
  const dbs = new Map();
  return {
    DB_PASS: process.env.DB_PASS,
    DB_USER: process.env.DB_USER
  };
}