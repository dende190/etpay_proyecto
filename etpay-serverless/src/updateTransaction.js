'use strict';

const AWS = require('aws-sdk');
const { queryBuild } = require('../utils/query_build');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.updateTransaction = async (event) => {
  const { id } = event.pathParameters;

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const condition = queryBuild.generateCondition(JSON.parse(event.body));
  const transaction = await (
    dynamoDB
    .update({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `set ${condition.updateExpressions.join(',')}`,
      ExpressionAttributeValues: condition.expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    })
    .promise()
  );

  return {
    status: 200,
    body: JSON.stringify({
      message: 'melo perro',
    }),
  };
};
