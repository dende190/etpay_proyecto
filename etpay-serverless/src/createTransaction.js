'use strict';

const AWS = require('aws-sdk');
const TABLE_NAME = 'Transferencias';

module.exports.createTransaction = async (event) => {
  const json = JSON.parse(event.body);

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  await (
    dynamoDB
    .put({
      TableName: TABLE_NAME,
      Item: json
    })
    .promise()
  );

  return {
    status: 200,
    body: JSON.stringify(json),
  };
};
