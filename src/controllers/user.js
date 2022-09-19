
import User from "../models/user.js";
import mongoose from "mongoose";
import { notFoundError, createError, missingData } from "../lib/error.js";
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
        const item= await user.save()
        console.log("el item", item)
        let userToCreateToken = {
          _id: item._id,
          username: item.username,
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
  let query = {
    $or: [
      {
        username: req.body.username,
      },
      {
        "email": req.body.username,
      },
    ],
    type: req.body.type,
  };
  User.findOne(query)
    .select(USER_DATA_SELECT)
    .populate("scope.id")
    .populate("currency")
    .populate("sections")
    .exec(async (err, user) => {
      // if there are any errors, return the error before anything else
      if (err) return next(err);

      // if no user is found, return the message
       if (!user) next(notFoundError());
      // const isValid =
      //   typeof req.body.password !== "undefined"
      //     ? await User.validPassword(user._id.toString(), req.body.password)
      //     : false;
      delete user.password;
      // if (!isValid) next(createError(403, req.lg.user.wrongPassword));
      if (!user.isActive) next(createError(401, req.lg.user.notActive));

      user.lastLogin = Date.now();
      user.typeLastLogin="EMAIL";
      if (
        user.activeScope == "" ||
        !user.activeScope ||
        user.activeScope == null
      ) {
        user.activeScope = user._id;
      }

      user.save(async (err) => {
        if (err) next(err);
        let relations = await Relation.countDocuments({
          $or: [{ petitioner: user._id }, { receptor: user._id }],
          isActive: true,
        }).exec();

        req.user = user;
        req.user.id = req.user._id.toString() || null;
        res.statusMessage = req.lg.user.successLogin;
        delete user.password;
        user = user.toJSON();
        user.relations = relations;

        // USER (TO CREATE TOKEN)

        let userToCreateToken = {
          _id: user._id,
          username: user.username,
        };
        console.log(user);
        res.json({
          access_token: accessTokenGen(userToCreateToken, true),
          refresh_token: refreshTokenGen(userToCreateToken),
          user,
        });
      });
    });
};