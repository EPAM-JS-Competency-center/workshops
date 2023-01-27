import { DocumentClient } from "@aws-sdk/client-dynamodb";

const docClient = new DocumentClient()

const tableName = process.env.ORDERS

exports.addOrder = async (event) => {
  const date = new Date().toISOString()

  /**
   * When message is consumed it will have .Records on it
   * whicih contains array of all records
   * You can read more here: https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
   */
  for (const record of event.Records) {
    const { messageId, body } = record
    let parsedBody = JSON.parse(body)

    let item = {
      id: messageId,
      food_name: parsedBody.data.foodName,
      amount: parsedBody.data.quantity,
      createdAt: date,
      orderStatus: 'PENDING',
    }

    let params = {
      TableName: tableName,
      Item: item,
    }

    await docClient.put(params).promise()
  }

  return {
    statusCode: 200,
  }
}
