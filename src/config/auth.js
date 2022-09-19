import jwt from "jsonwebtoken";
// import mainConfig from '../main';

import envar from "./envar.js";
import User from "../models/user.js";
import { createError } from "../lib/error.js";

// funcs to decoded, encoded and generate accessToken
const decodeFunc = (token) => {
  try {
    return jwt.verify(token, envar().SECRET);
  } catch (err) {
    return err;
  }
};
const encodeFunc = (toSing, expiresIn) => {
  return jwt.sign(toSing, envar().SECRET, { expiresIn });
};
const accessToken = (user, tokenFresh = false) => {
  return encodeFunc({ ...user, tokenFresh }, "365d");
};
const tokenEmailFunction = (user, tokenFresh = false) => {
  return encodeFunc({ ...user, tokenFresh }, "15min");
};

// export the functions to decoded, encoded and generate accessToken
export const decode = decodeFunc;
export const encode = encodeFunc;
export const accessTokenGen = accessToken;
export const tokenEmail=tokenEmailFunction;

// export the functions to generate refresh_token and get access with the refresh_token
export const refreshTokenGen = (user) => {
  return encodeFunc(user, "60d");
};
export const getTokenByRefresh = (refresh) => {
  let payload = decodeFunc(refresh);
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti;
  return accessToken(payload);
};

// export const isAuth = (req, res, next) => {
//   if (req.isAuthenticated() || req.method === "OPTIONS" || req.headers.authorization === "postmanvn4b4s3") {
//     // if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.status(403).send({
//       msg: "Not authorized."
//     });
//   }
// };

export const isAuthOptional = async (req, res, next) => {
  req.access_token = req.headers.authorization;
  if (typeof req.access_token !== "undefined" && req.access_token !== "") {
    let decoded;
    try {
      decoded = decodeFunc(req.access_token);

      let authUser = await User.findOne({ _id: decoded._id })
        .select(
          "isActive webpush security.hasPassword security.isRandom isActive name username idNumber phones emails scope address imgUrl currency google.name google.email google.imgUrl contacts mutedUsers sections otherAccounts"
        )
        .populate("scope.id", "name id _id")
        .exec();

      authUser.id = authUser._id.toString();

      req.user = authUser;
      next();
    } catch (err) {
      let message =
        decoded.name === "TokenExpiredError"
          ? "The token has expired"
          : "Not authorized.";
      next(createError(401, message));
    }
    // next();
  } else if (req.method === "OPTIONS") {
    next();
  } else {
    next();
  }
};

export const isAuth = async (req, res, next) => {
  req.access_token = req.headers.authorization;
  if (typeof req.access_token !== "undefined" && req.access_token !== "") {
    let decoded = decodeFunc(req.access_token);

    let authUser;
    try {
      authUser = await User.findOne({ _id: decoded._id })
        .select(
          "isActive webpush security.hasPassword security.isRandom isActive name username idNumber phones emails scope address imgUrl currency google.name google.email google.imgUrl contacts mutedUsers sections otherAccounts"
        )
        .populate([
          {
            path: "scope.id",
            select: "name id _id",
          },
          {
            path: "sections",
          },
        ])
        .exec();

      authUser.id = authUser._id.toString();
      req.user = authUser;
      next();
    } catch (err) {
      let isTokenError = decoded.name === "TokenExpiredError" ? true : false;

      if (isTokenError) {
        next(createError(401, "The token has expired"));
      } else {
        next(createError(304, "Not authorized."));
      }
    }
    // next();
  } else if (req.method === "OPTIONS" || req.query.outside) {
    console.log(req.query);
    next();
  } else {
    res.status(401).send({
      msg: "Not authorized, client must send an access token.",
    });
  }
};

