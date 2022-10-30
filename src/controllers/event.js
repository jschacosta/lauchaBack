import  {sendMailTest}  from "../lib/mailer.js";

export const create = async (req, res, next) => {
    console.log('wena wena')
    sendMailTest()

    res.send('wena wena')
};


export const get = async (req, res, next) => {
    console.log('wena wena')
    sendMailTest()

    res.send('wena wena')
};