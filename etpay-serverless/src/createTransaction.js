'use strict';

const AWS = require('aws-sdk');
const { transformData } = require('../utils/tranform_data');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.createTransaction = async (event) => {
  const data = JSON.parse(event.body);
  const dataNormalized = transformData.init(data);
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
