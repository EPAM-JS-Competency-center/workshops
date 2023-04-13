+++
title = "Update producer"
weight = 2
+++

We need to update our code which pushes messages into the queue. It's our `send-order-to-queue` lambda.

```
// Open the directory
cd ~/environment/workspace/workshops/messaging-in-the-cloud/resources/code/send-order-to-queue

// Install required library
npm install amqplib --save
```

Open `send-order-to-queue/index.js` inside folder `send-order-to-queue` and replace SQS implementation with this code:

```
const uuid = require('node-uuid');
const amqlib = require('amqplib');

exports.sendOrderToQueue = async (event) => {
  const body = JSON.parse(event.body)

  try {
    // Connnects to RabbitMQ
    const conn = await amqlib.connect(process.env.QUEUE_URL);

    // Creates channel for communication
    const ch = await conn.createChannel();

    // Publishes message to the queue
    await ch.sendToQueue(process.env.QUEUE_NAME, Buffer.from(event.body));

    console.log('Published the message to the queue', body);
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
```

Let's build and deploy our code:

```
cd ../
sam build --template template.yaml
sam deploy --stack-name orders
```

After it gets deployed we first need to setup proper environment variables, extract Rabbit URL from Amazon MQ > Brokers > select your broker and under connections copy `Endpoints`

![Get Rabbit URL](/images/mq/get-rabbitmq-endpoint.png)

Now open `send-order-to-queue` Lambda function and it's environment variables, edit them to contain QUEUE_URL and QUEUE_NAME.

  - QUEUE_NAME is `orders`, it was one which we created in previous lesson
  - QUEUE_URL is formatted in this way:
      - amqps://{USER_NAME}:{PASSWORD}@{URL}

```
QUEUE_URL=amqps://rabbit:{ENTER_YOUR_PASSWORD}@{REST_OF_ENDPOINT}
QUEUE_NAME=orders
```

![Setup env variables for RabbitMQ](/images/mq/lambda-environment.png)

Let's test it now, send new order, it should be sent into RabbitMQ now and not into SQS.

```
curl -s --header "Content-Type: application/json"   --request POST   --data '{"foodName": "Pancake", "quantity":2 }'   $API_ENDPOINT
```

After you send it, you can open again Web Console of RabbitMQ and you should see our message in the queue:

![RabbitMQ showing one message in the queue](/images/mq/rabbitmq-messages-in-queue.png)
