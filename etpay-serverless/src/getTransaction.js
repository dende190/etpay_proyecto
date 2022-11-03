'use strict';

const AWS = require('aws-sdk');
const TABLE_NAME = 'Transferencias';

module.exports.getTransaction = async (event) => {
  const { id } = event.pathParameters;
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const transaction = await (
    dynamoDB
    .get({
      TableName: TABLE_NAME,
      Key: {
        id: id,
      }
    })
    .promise()
  );

  return {
    status: 200,
    body: transaction.Item,
  };
};
