
import {testEmailAWS} from '../services/aws_ses.js'
export const sendTestEmail = async (req, res, next) => {
    console.log("--EMAIL TEST AWS--");
    testEmailAWS();
    res.send("wena wena");
  };