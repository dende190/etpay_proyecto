'use strict';

const AWS = require('aws-sdk');
const TABLE_NAME = 'Transferencias';
const S3_BUCKET = 'database-json';
const S3_FILE = 'database_etpay.json';

const init = async (event) => {
  const S3 = new AWS.S3();
  const databaseFile = await (
    S3
    .getObject({
      Bucket: S3_BUCKET,
      Key: S3_FILE,
    })
    .promise()
  );
  const databaseJSON = JSON.parse(databaseFile.Body);

  const dynamoDB = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
  for (let value in databaseJSON) {
    await (
      dynamoDB
      .put({
        TableName: TABLE_NAME,
        Item: databaseJSON[value]
      })
      .promise()
    );
  }

  return {
    status: 200,
    body: {
      message: 'base de datos inicializada',
    },
  };
};

init();
