
import User from "../models/user.js";
import mongoose from "mongoose";
import { notFoundError, createError, missingData } from "../config/error.js";
import {
  getTokenByRefresh,
  refreshTokenGen,
  accessTokenGen,
  tokenEmail,
  decode
} from "../config/auth.js";

export const test = async (req, res, next) => {
    console.log('wena wena')
    res.send('wena wena')
};

export const registerEmail = async (req, res, next) => {
    console.log('============= REGISTER NEW USER AND CREATE TOKEN   =============')
    let user = new User(req.body);
    if (req.body.password) {
      user.password = User.hash(req.body.password);
    }
    user.type = req.body.type || "personal";
    user.name.first=req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1).toLowerCase().trim()
    user.name.last=req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1).toLowerCase().trim()
    user.email= user.email.toLowerCase().trim()
    if(user.username && user.username.length>0){
      let exists = await User.findOne({
        username: user.username,
      })
      .exec();
      if (exists){
        // user.username= mongoose.Types.ObjectId()
        user.username= user.email.toLowerCase().trim().replace(/@/g,'_').replace(".","_")
      }
      else{
        user.username= user.username.toLowerCase().trim()
      }
    }
    else{
      user.username= user.email.toLowerCase().trim().replace(/@/g,'_').replace(".","_")
    }
    try{
        console.log("saving...", user)
        const newUser= await user.save()
        console.log("el item", newUser)
        let userToCreateToken = {
          _id: newUser._id,
          username: newUser.username,
        };
        console.log(userToCreateToken,userToCreateToken._id)
        res.json({
          access_token: accessTokenGen(userToCreateToken, true),
              refresh_token: refreshTokenGen(userToCreateToken),
              user:item,
        })

        // user.save((err, item) => {
        //   if (err) next(err);
        //   res.send("hola")
        // });
    }
    catch(err){
      next(err);
    }
};
export const loginEmail = async (req, res, next) => {
  console.log('============= LOGIN USER BY EMAIL AND REFRESH TOKEN   =============')
    const { email, password} = req.body;
    User.findOne({email})
    .select(
      "name _id email isActive"
    )
    // .populate("users")
    .exec(async (err, user) => {
      if (err) return next(err);
      if (!user) return next(notFoundError());
      const isValid =
      typeof password !== "undefined"
      ? await User.validPassword(user._id.toString(), password)
      : false;
      if (!isValid) return next(createError(403, "wrong password"));
      user.lastLogin = Date.now();
      user.save(async (err,user) => {
        if (err) next(err);
        delete user.password;
        // USER (TO CREATE TOKEN)
        let userToCreateToken = {
          _id: user._id,
          username: user.username,
        };
        console.log(user);
        res.status(200).json({
          msg:"login success",
          access_token: accessTokenGen(userToCreateToken, true),
          refresh_token: refreshTokenGen(userToCreateToken),
          user
        })
      });
      
    });  
};

export const create = async (req, res, next) => {
  console.log("--CREATE NEW USER--")
  let user = new User(req.body);
  console.log('user',user)
  user.type = req.body.type || "personal";
  user.name.first=user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1).toLowerCase().trim()
  user.name.last=user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1).toLowerCase().trim()
  user.email= user.email.toLowerCase().trim()
  if(user.username && user.username.length>0){
    let exists = await User.findOne({
      username: user.username,
    })
    .exec();
    if (exists){
      // user.username= mongoose.Types.ObjectId()
      user.username= user.email.toLowerCase().trim().replace(/@/g,'_').replace(".","_")
    }
    else{
      user.username= user.username.toLowerCase().trim()
    }
  }
  else{
    user.username= user.email.toLowerCase().trim().replace(/@/g,'_').replace(".","_")
  }
  try{
    console.log("saving...", user)
    const newUser= await user.save()
    console.log("el item", newUser)
    res.json(newUser)
    // user.save((err, item) => {
    //   if (err) next(err);
    //   res.send("hola")
    // });
  }
  catch(err){
    next(err);
  }
};

export const getUsers= async (req, res, next) => {
  console.log('GET USERS...')
  let body={}
  Object.assign(body, req.query);
  console.log("query", body)
  let options = {
    // populate,
    // select,
    page:body.page||1,
    limit:body.limit||50,
    sort:{ updatedAt: -1 },
  }
  let query = body.type?{type:body.type}:""
  try{
    User.paginate(
      query,
      options,
      (err, items) => {
        if (err) return next(err);
        res.send(items);
      }
    );
  }
  catch (err) {
    next(err);
  }
};


export const getById= async (req, res, next) => {
};

export const getByType= async (req, res, next) => {
};

export const putUser= async (req, res, next) => {
};

export const activateMany= async (req, res, next) => {
};