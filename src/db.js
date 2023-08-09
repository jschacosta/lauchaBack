import mongoose from "mongoose";


const uri = 'mongodb+srv://sostravelbr:viajanteDb_sos@cluster0.qprjwcb.mongodb.net/'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  });
  
let db = mongoose.connection;

export default db;