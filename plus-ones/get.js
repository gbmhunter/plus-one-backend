'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {

  let data = event.queryStringParameters;
  console.log('data =')
  console.log(data)

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: data.url,
    },
  };

  var count = 0

  // fetch todo from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    console.log('Database returned result =')
    console.log(result)
    if (result.hasOwnProperty('Item')) {
      count = result.Item.count
    }
    console.log('count = ' + count)

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ 'count': count }),
    };
    console.log('Returning response =')
    console.log(response)
    callback(null, response);
  });
};