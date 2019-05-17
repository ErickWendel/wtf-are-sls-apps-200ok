'use strict';
const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const { readFileSync } = require('fs');

(async () => {
  const c = await S3.createBucket({
    Bucket: 'connect-storage-talk',
  }).promise();
  console.log('c', c);

  const data = await S3.putObject({
    Body: readFileSync('./item.csv'),
    Key: 'item.csv',
    Bucket: 'connect-storage-talk',
  }).promise();

  console.log('data', JSON.stringify(data));
})();
