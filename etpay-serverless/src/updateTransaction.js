'use strict';

const AWS = require('aws-sdk');
const { conditionsBuild } = require('../utils/conditions_build');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.updateTransaction = async (event) => {
  const { id } = event.pathParameters;

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const condition = conditionsBuild.update(JSON.parse(event.body));
  const transaction = await (
    dynamoDB
    .update({
      TableName: TABLE_NAME,
      Key: { id },
      UpdateExpression: `set ${condition.updateExpressions.join(',')}, updatedAt = :updatedAt`,
      ExpressionAttributeValues: {
        ...condition.expressionAttributeValues,
        ':updatedAt': new Date().getTime(),
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise()
  );

  return {
    status: 200,
    body: transaction.Attributes,
  };
};
