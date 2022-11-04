'use strict';

const AWS = require('aws-sdk');
const { conditionsBuild } = require('../utils/conditions_build');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.queryTransaction = async (event) => {
  const { select, conditions } = JSON.parse(event.body);

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const condition = conditionsBuild.query(conditions);

  const transactions = await (
    dynamoDB
    .scan({
      TableName: TABLE_NAME,
      ProjectionExpression: select,
      FilterExpression: condition.filterExpression,
      ExpressionAttributeValues: condition.expressionAttributeValues,
    })
    .promise()
  );

  return {
    status: 200,
    body: (
      transactions.Items.length ?
      transactions.Items :
      {message: 'No se encontraron registros'}
    ),
  };
};
