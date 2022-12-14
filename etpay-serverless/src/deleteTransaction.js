'use strict';

const AWS = require('aws-sdk');
const TABLE_NAME = process.env.TABLE_NAME;

module.exports.deleteTransaction = async (event) => {
  const { id } = event.pathParameters;
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  await (
    dynamoDB
    .delete({
      TableName: TABLE_NAME,
      Key: { id }
    })
    .promise()
  );

  return {
    status: 200,
    body: {
      message: `El registro ${id}, fue eliminado correctamente`,
    },
  };
};
