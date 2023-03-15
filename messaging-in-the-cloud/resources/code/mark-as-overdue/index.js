const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.ORDER_TABLE

exports.markAsOverdue = async (event) => {
  let params = {
    ExpressionAttributeValues: {
      ':s': 'PENDING',
    },
    FilterExpression: 'orderStatus = :s',
    TableName: tableName,
  }

  const data = await dynamoClient.scan(params).promise()

  for(let item of data.Items) {
    const date = new Date(item.createdAt)
    const now = new Date()
    const pastHour = (new Date()).setHours(now.getHours() - 1);

    if (date.getTime() > pastHour) continue

    let params = {
      TableName: tableName,
      Key: {
          id: item.id,
          food_name: item.food_name,
      },
      ExpressionAttributeValues: {
        ':s': 'OVERDUE',
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET orderStatus = :s',
    }

    await dynamoClient.update(params).promise()
  }

  return {
    statusCode: 200,
  }
}
