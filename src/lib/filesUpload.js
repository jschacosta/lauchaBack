// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand, CreateBucketCommand,S3Client } from "@aws-sdk/client-s3";
import { s3 } from "./sampleClient.js";
import envar from "../lib/envar.js"

export const upload = (file) => {
  return new Promise((resolve, reject) => {
    let s3bucket = new aws.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME_FILES,
    });
    s3bucket.createBucket(() => {
      console.log(file.fileName)
      let params = {
        Bucket: BUCKET_NAME_FILES,
        Key: file.fileName,
        Body: file.buffer,
        ACL: "public-read",
      };
      console.log("params",params)
      s3bucket.upload(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  });
};


export const run = async (file) => {
  // Create an Amazon S3 bucket.
  try {
    console.log("entro al run")
    let params = {
      Bucket: envar().BUCKET_NAME_FILES,
      Key: file.fileName,
      Body:file.buffer,
      Region:envar().REGION
    };

    const command= new PutObjectCommand(params)
    console.log(s3.credentials)
    console.log(params)
    let final= await s3.send(command)
    console.log(final)
    return final; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
  // // Create an object and upload it to the Amazon S3 bucket.
  // try {
  //   console.log(file.fileName)
   
  //   const results = await s3Client.send(new PutObjectCommand(params));
  //   console.log(
  //       "Successfully created " +
  //       params.Key +
  //       " and uploaded it to " +
  //       params.Bucket +
  //       "/" +
  //       params.Key
  //   );
  //   return results; // For unit tests.
  // } catch (err) {
  //   console.log("Error", err);
  // }
};