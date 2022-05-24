import mongoose from "mongoose";


const dbConfig = {
    dev: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}`,
  };
mongoose.connect(dbConfig.dev, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  });
  
let db = mongoose.connection;

export default db;