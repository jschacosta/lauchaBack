import AWS from "aws-sdk";
import envar from "../config/envar.js";

// Set the region 
AWS.config.update({
    region: 'us-east-1'
});

export const SEND_EMAIL = EMAIL_DATA => {
  return new Promise((resolve, reject) => {
     console.log('============= SEND_EMAIL =============');


    var params = {
        Destination: {
            /* required */
            CcAddresses: EMAIL_DATA.cc,
            ToAddresses: EMAIL_DATA.to
        },
        Source: EMAIL_DATA.source,
        /* required */
        Template: EMAIL_DATA.template,
        /* required */
        TemplateData: EMAIL_DATA.templateData,
        /* required */
        ReplyToAddresses: EMAIL_DATA.replyTo
    };

     // Create the promise and SES service object
     var sendPromise = new AWS.SES({
         apiVersion: '2010-12-01',
         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
         accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
         region: 'us-east-1'
     }).sendTemplatedEmail(params).promise();

     // Handle promise's fulfilled/rejected states
     sendPromise.then(
         function (data) {
             console.log(data.MessageId);
             resolve(data);
             
         }).catch(
         function (err) {
             console.error(err, err.stack);
             reject(err);
         });

        })
}