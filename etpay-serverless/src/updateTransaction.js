'use strict';

const AWS = require('aws-sdk');
const { queryBuild } = require('../utils/query_build');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.updateTransaction = async (event) => {
  const { id } = event.pathParameters;

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const condition = queryBuild.generateCondition(JSON.parse(event.body));
  try {
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
  } catch (error) {
    return {
      status: 500,
      body: {
        error,
      },
    };
  }

  return {
    status: 200,
    body: transaction,
  };
};
