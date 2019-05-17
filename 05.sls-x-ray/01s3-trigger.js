'use strict';
const csv = require('csvtojson/v2');
const awsXRay = require('aws-xray-sdk');
const AWS = awsXRay.captureAWS(require('aws-sdk'));

const S3 = new AWS.S3();
const SQS = new AWS.SQS();
//
const getJSONFromCSV = async (bucketKey, bucketName) => {
  const { Body } = await S3.getObject({
    Key: bucketKey,
    Bucket: bucketName,
  }).promise();

  const data = await csv().fromString(Body.toString());
  return data;
};

const createQueue = async () => {
  const { QueueUrl } = await SQS.createQueue({
    QueueName: process.env.QUEUE_NAME_1,
  }).promise();
  return QueueUrl;
};

const mapEvent = data =>
  data.map(item => ({
    Id: item.id,
    MessageBody: JSON.stringify(item),
    DelaySeconds: 0,
  }));

const sendToQueue = async data => {
  const entries = mapEvent(data);
  const queueUrl = await createQueue();

  return SQS.sendMessageBatch({
    QueueUrl: queueUrl,
    Entries: entries,
  }).promise();
};

const example = async event => {
  console.log('EVENT**', JSON.stringify(event));

  const [{ s3 }] = event.Records;
  const bucketName = s3.bucket.name;
  const bucketKey = decodeURIComponent(s3.object.key);

  const data = await getJSONFromCSV(bucketKey, bucketName);
  await sendToQueue(data);

  return {
    statusCode: 200,
  };
};

module.exports = {
  example,
};
