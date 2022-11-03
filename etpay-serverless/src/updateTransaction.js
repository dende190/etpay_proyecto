'use strict';

const AWS = require('aws-sdk');
const TABLE_NAME = 'Transferencias';

module.exports.updateTransaction = async (event) => {
  const { id } = event.pathParameters;
  const { validated, tipo, monto } = JSON.parse(event.body);

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const transaction = await (
    dynamoDB
    .update({
      TableName: TABLE_NAME,
      Key: {
        id: id,
      },
      UpdateExpression: 'set validated = :validated, tipo = :tipo, monto = :monto',
      ExpressionAttributeValues: {
        ':validated': validated,
        ':tipo': tipo,
        ':monto': monto,
      },
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
