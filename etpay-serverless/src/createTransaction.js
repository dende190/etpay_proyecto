'use strict';

const AWS = require('aws-sdk');
const { normalizeData } = require('../utils/normalize_data');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.createTransaction = async (event) => {
  const transactionData = JSON.parse(event.body);
  const dataNormalized = normalizeData.init(transactionData);
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  await (
    dynamoDB
    .put({
      TableName: TABLE_NAME,
      Item: dataNormalized
    })
    .promise()
  );

  return {
    status: 200,
    body: dataNormalized,
  };
};
