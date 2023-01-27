import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"

const sqsClient = new SQSClient({ region: process.env.REGION });
const queueUrl = process.env.QUEUE_URL

exports.sendOrderToQueue = async (event) => {
  const body = JSON.parse(event.body)

  try {
    const params = {
      DelaySeconds: 2,
      MessageBody: JSON.stringify(event.body),
      QueueUrl: queueUrl
    };

    const command = new SendMessageCommand(params)
    await sqsClient.send(command)
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
