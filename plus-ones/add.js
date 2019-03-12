'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.add = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const inputData = JSON.parse(event.body);
  if (typeof inputData.url !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: 'Couldn\'t add one, URL invalid.',
    });
    return;
  }

  const get_params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: inputData.url,
    },
  };

  var count = 0

  console.log('Calling dynamoDb.get() with params =')
  console.log(get_params)
  dynamoDb.get(get_params, function (error, data) {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Database returned data =')
    console.log(data)

    console.log('count = ' + count)
    if (data.hasOwnProperty('Item')) {
      count = data.Item.count
    }
    console.log('count = ' + count)

    count += 1
    

    const put_params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: inputData.url,
        'count': count,
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    console.log('Storing item into database. params =')
    console.log(put_params)

    // write the todo to the database
    dynamoDb.put(put_params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: 'Couldn\'t add one, dynamoDB returned error.',
        });
        return;
      }

      // create a response
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ count: count }),
      };
      callback(null, response);
    });

  })


};