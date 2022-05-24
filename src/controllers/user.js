
import User from "../models/user.js";

export const test = async (req, res, next) => {
    console.log('wena wena')
    res.send('wena wena')
};

export const testPost = async (req, res, next) => {
    console.log('wena wena post')
    let user = new User({
        isActive: true,
        petitioner: 'yo',
        receptor: 'tu'
      });
      try{
          const user2= await user.save();
          res.send(user2)
      }
      catch(err){
        next(err);
      }
};