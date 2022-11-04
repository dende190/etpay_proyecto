'use strict';

const AWS = require('aws-sdk');
const { conditionsBuild } = require('../utils/conditions_build');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.queryTransaction = async (event) => {
  const { select, conditions } = JSON.parse(event.body);

  let params = {
    TableName: TABLE_NAME,
    ProjectionExpression: select,
  };
  if (conditions) {
    const condition = conditionsBuild.query(conditions);
    params = {
      ...params,
      FilterExpression: condition.filterExpression,
      ExpressionAttributeValues: condition.expressionAttributeValues,
    }
  }

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const transactions = await dynamoDB.scan(params).promise();
  return {
    status: 200,
    body: (
      transactions.Items.length ?
      transactions.Items :
      {message: 'No se encontraron registros'}
    ),
  };
};
