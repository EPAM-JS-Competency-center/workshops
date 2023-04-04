const uuid = require('node-uuid');
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

const dynamoClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const tableName = process.env.INVOICE_TABLE

exports.createInvoice = async (event) => {
  const date = new Date().toISOString()
  const { detail } = event

  let item = {
    id: uuid.v4(),
    order_id: detail.id,
    created_at: date,
  }

  let params = {
    TableName: tableName,
    Item: item,
  }

  await dynamoClient.put(params).promise()

  return {
    statusCode: 200,
  }
}
