'use strict';

const AWS = require('aws-sdk');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.getAllTransactions = async () => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const transactions = await (
    dynamoDB
    .scan({
      TableName: TABLE_NAME,
    })
    .promise()
  );

  return {
    status: 200,
    body: transactions.Items,
  };
};
