'use strict';
const { sign, verify } = require('jsonwebtoken');
const { promisify } = require('util');
const verifyAsync = promisify(verify);

const DEFAULT_USER = {
  user: 'erickwendel',
  pass: '123',
};
const JWT_KEY = '123321';

//--------
const hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World!',
      },
      null,
      2,
    ),
  };
};

const authorizerFunc = async (event, context, cb) => {
  console.log('authorizerFunc invoked', new Date().toISOString());

  // error -> throw exception and stop lambda
  await verifyAsync(event.authorizationToken, JWT_KEY);

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: 'Allow',
        Resource: event.methodArn,
      },
    ],
  };

  const authResponse = {
    policyDocument,
    principalId: 'xyz',
    context: {
      stringKey: 'stringval',
      numberKey: 123,
      booleanKey: true,
    },
  };
  return authResponse;
  // cb(null, authResponse);
};

const login = async (event, context) => {
  console.log('Login invoked!...', new Date().toISOString());
  const { user, pass } = JSON.parse(event.body);

  if (user !== DEFAULT_USER.user || pass !== DEFAULT_USER.pass) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: 'Unauthorized',
      }),
    };
  }
  const token = sign({ user }, JWT_KEY, { expiresIn: '1h' });
  return {
    statusCode: 200,
    body: JSON.stringify({
      token,
    }),
  };
};

module.exports = {
  hello,
  login,
  authorizerFunc,
};
