'use strict';

const AWS = require('aws-sdk');
const { transformData } = require('../utils/tranform_data');
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
        Item: transformData.init(databaseJSON[value]),
      })
      .promise()
    );
  }

  console.log('Datos cargados a la base de datos con exito');
};

init();
