import { SEND_EMAIL } from "../services/amazon_ses.js";
import AWS from "aws-sdk";

var ses = new AWS.SES();
export const sendMail = async (req, res, next) => {
  console.log("--Send Email--")
  console.log(req.body);

  let EMAIL_DATA = {
    cc: req.body.cc, // ARRAY
    to: req.body.to, //ARRAY
    replyTo: req.body.replyTo, //ARRAY
    template: req.body.template, // STRING
    templateData: req.body.templateData, // STRING
    source: req.body.source, //STRING
  };

  let resp = await SEND_EMAIL(EMAIL_DATA);
  res.send(resp);
};
export const getTemplate = async (req, res, next) => {
  let params = {
    TemplateName: req.params.template/* required */
  };
  ses.getTemplate(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else  res.send(data.Template);;           // successful response
  });
};

export const sendMailTest = async (req, res, next) => {
    console.log("--Send Email test--")
  
    let EMAIL_DATA = {
      cc: ['jschacosta@gmail.com'],
      to: ["jschacosta@gmail.com", "stefano.celsi.12@sansano.usm.cl"],
      // to: ["jschacosta@gmail.com"],
      replyTo: [],
      template: 'index',
      templateData:"{\"user_name\":\"" + ' ' + "\"}",
      source: 'johann <info@johannsch.pro>',
      };
  
    let resp = await SEND_EMAIL(EMAIL_DATA);
    // res.send(resp);
    console.log(resp)
  };