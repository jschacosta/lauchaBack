import envar from "../config/envar.js";
import {S3Client} from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  credentials:{
    accessKeyId:envar().IAM_USER_KEY,
    secretAccessKey:envar().IAM_USER_SECRET,
  },
  region:envar().REGION
})
