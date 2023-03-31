import { SNSClient , PublishCommand, PublishCommandInput } from "@aws-sdk/client-sns";

import "dotenv/config";

const SNS_REGION = process.env.SNS_REGION;
const SNS_ACCESS_KEY = process.env.SNS_ACCESS_KEY;
const SNS_SECRET_KEY = process.env.SNS_SECRET_KEY;
const MY_PHONENUMBER = process.env.MY_PHONENUMBER

const snsClient = new SNSClient({
  credentials: {
    accessKeyId: SNS_ACCESS_KEY as string,
    secretAccessKey: SNS_SECRET_KEY as string
  },
  region: SNS_REGION,
});

const params : PublishCommandInput= {
  Message : "Text", /** Text */
  PhoneNumber : `+82${MY_PHONENUMBER}`, /** Phone Number */
}

const run = async () => {
    try {
        const data = await snsClient.send(new PublishCommand(params));
        console.log("Success.",  data);
        return data; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }
}

run();