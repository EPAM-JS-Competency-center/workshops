const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.ORDER_TABLE

exports.updateOrder = async (event) => {
  const { body } = event
  const data = JSON.parse(body)

  let params = {
    TableName: tableName,
    Key: {
        id: data.id,
        food_name: data.foodName,
    },
    ExpressionAttributeValues: {
        ':status': data.status,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'SET orderStatus = :status',
  }

  console.log('params', params)

  await dynamoClient.update(params).promise()
  return {
    statusCode: 200,
  }
}
