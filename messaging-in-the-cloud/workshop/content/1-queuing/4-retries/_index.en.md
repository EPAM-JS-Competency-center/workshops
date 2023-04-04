+++
title = "Retries"
weight = 3
+++

Now that we have Queue and a way to consume it, question is what happens in case of failure? Best practice is to use `Dead letter queue` and retries. This way, we can configure that after 3 retries it gets sent to separate queue which will keep message for some time before it's deleted. Otherwise our retires would keep retrying all the time.

![Setup for retries](/images/sqs/retries/retries.png)

Dead letter queue gets configured on the SQS directly, open the SQS console and click on create queue, let's configure one more queue which will act as Dead Letter Queue. This one can also be FIFO queue and let's name it `orders_deadletter.fifo` and then create it.

![Creating dead letter queue](/images/sqs/retries/deadletter-creation.png)

Now that we created queue which will act as dead letter, we need to link it to our `orders.fifo` queue. Go and click to edit `orders.fifo` queue. Under edit there is `Dead-letter queue` section enable it and choose `orders_deadletter.fifo` queue. In order to setup number of retries, we can modify `Max recieves` to be 3 in this case, which means that after 3 retries it will get pushed into dead letter queue. Now we can save this configuration, this will link these two queues.

![Creating dead letter queue](/images/sqs/retries/deadletter-link.png)

In order to test this change, let's modify `add-orders/index.js` to fail when it tries to consume the messages, copy this code:

```
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

const dynamoClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const tableName = process.env.ORDER_TABLE

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

    if (!parsedBody.foodName || !parsedBody.quantity) {
      throw new Error('Message is missing foodName or quantity')
    }

    let item = {
      id: messageId,
      food_name: parsedBody.foodName,
      amount: parsedBody.quantity,
      createdAt: date,
      orderStatus: 'PENDING',
    }

    let params = {
      TableName: tableName,
      Item: item,
    }

    await dynamoClient.put(params).promise()
  }

  return {
    statusCode: 200,
  }
}
```

It will fails to consume if we are missing some of the properties, let's deploy our Lambda again:
```
cd ~/environment/workspace/workshops/messaging-in-the-cloud/resources/code
sam build --template-file template.yaml
  sam deploy --stack-name orders
```

Now when we everything ready, let's try and send some request which will keep failing:
```
curl -s --header "Content-Type: application/json"   --request POST   --data '{"foodName": "Pizza" }' $API_ENDPOINT
```

This one should be pushed into dead letter queue after 3 retries, and we can see that it ends up Dead Letter Queue if we open console and check messages after some time. With this pattern we can recover later on and it won't block other messages from processing.

![Creating dead letter queue](/images/sqs/retries/deadletter-message.png)