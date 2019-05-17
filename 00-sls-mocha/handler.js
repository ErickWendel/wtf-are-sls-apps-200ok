'use strict';

module.exports.hello = async event => {
  const { v1, v2 } = event.queryStringParameters;
  return {
    statusCode: 200,
    body: `${parseInt(v1) + parseInt(v2)}`,
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
