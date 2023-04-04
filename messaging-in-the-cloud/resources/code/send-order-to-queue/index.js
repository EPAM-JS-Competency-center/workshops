const AWS = require('aws-sdk');
const uuid = require('node-uuid');

AWS.config.update({region: 'REGION'});
const sqsClient = new AWS.SQS({apiVersion: '2012-11-05'});
const queueUrl = process.env.QUEUE_URL

exports.sendOrderToQueue = async (event) => {
  const body = JSON.parse(event.body)

  try {
    const params = {
      MessageBody: event.body,
      MessageGroupId: 'orders',
      MessageDeduplicationId: uuid.v4(),
      QueueUrl: queueUrl
    };

    await sqsClient.sendMessage(params).promise()
    console.log('Published the message to the queue', body)
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
    }
  }

  return {
    statusCode: 200,
  }
}
