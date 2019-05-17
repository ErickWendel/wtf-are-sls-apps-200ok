'use strict';

module.exports.hello = async (event, context) => {
  const { val1, val2 } = event.body;
  return {
    statusCode: 200,
    body: val1 + val2,
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
