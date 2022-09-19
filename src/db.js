import mongoose from "mongoose";


const uri = 'mongodb+srv://coloro:Pepekika@pollagol.5pmli.mongodb.net/barberApi?retryWrites=true&w=majority'
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  });
  
let db = mongoose.connection;

export default db;