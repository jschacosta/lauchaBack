import envar from "../config/envar.js";
import {S3Client} from "@aws-sdk/client-s3"
import {SESClient} from '@aws-sdk/client-ses'

const config ={
    region:envar().REGION,
    credentials:{
      accessKeyId:envar().IAM_USER_KEY,
      secretAccessKey:envar().IAM_USER_SECRET,
    }
}
//AWS S3
export const s3 = new S3Client(config)
//AWS SES
export const SES = new SESClient(config)
