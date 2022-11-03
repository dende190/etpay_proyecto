'use strict';

const AWS = require('aws-sdk');
const { queryBuild } = require('../utils/query_build');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.queryTransaction = async (event) => {
  const { select, where } = JSON.parse(event.body);

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const condition = queryBuild.generateCondition(where);
  const transactions = await (
    dynamoDB
    .scan({
      TableName: TABLE_NAME,
      ProjectionExpression: select,
      FilterExpression: condition.updateExpressions.join(' AND '),
      ExpressionAttributeValues: condition.expressionAttributeValues,
    })
    .promise()
  );

  return {
    status: 200,
    body: transactions.Items,
  };
};
