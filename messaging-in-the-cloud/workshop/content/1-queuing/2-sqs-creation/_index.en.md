+++
title = "Create queue"
weight = 2
+++

In this part of the lesson we will start creating Queue, and configuring our Lambda to send it to the queue.
This queue will be consumed between both of our lambdas. Currently our stack looks like this:

![Missing queue on the image](/images/sqs/without-queue.png)

So in order to fill the blank above, we need to start creating it. Open SQS Service in AWS and go to the `Create Queue`

![Create queue](/images/sqs/creation/create-queue.png)

Because we want just to create and connect our Queue for now, let's choose `FIFO` queue and type name `orders.fifo`

![Choose FIFO queue and type its name](/images/sqs/creation/queue-naming.png)

There are 2 types of queue:
- **Standard** - doesn't guarantee order and can deliver our messages multiple times. It's great for scalability and when you don't need to respect order and can deliver multiple times
- **FIFO** - Best for our usecase where we are building order processing. Because it will keep the same order and will deliver our message only once

Let's leave everything as it is, and click `Create queue`.

If you remember from the previous steps, our `sendOrderToQueue` lambda expect us to provide environment variable to the lambda function, so let's do that and then we can test if our messages will end up in the queue.

Every queue has it's own url which we can use to send messages to it. On dashboard of your queue, copy the URL.

![Choose FIFO queue and type its name](/images/sqs/creation/queue-url.png)

Because our Lambda `sendOrderToQueue` needs to send message into this queue, we need to provide environment variable to it because it expects it. You can check that in `resources/code/send-order-to-queue/index.js`. It expect variable `QUEUE_URL`.

Go to the Lambda service in the AWS and open `sendOrderToQueue` lambda. There you have `Configuration` tab which holds `Environment` and let's add new env variable.

![Edit env variable of the lambda](/images/sqs/creation/lambda-edit-env.png)

Once you get there go to `Edit` and there you can add and remove env variables which are used. So Let's add `QUEUE_URL` and paste the `url` of your SQS.

![Add new variable](/images/sqs/creation/lambda-add-env.png)

Great, now you have everything configured to test if this connection works! You can do that through API Gateway and try to send request with body

```
{
  "foodName": "Pizza",
  "quantity": 2
}
```

Let's configure variable for our ENDPOINT so that we can call it from the terminal:
```
API_ENDPOINT=`aws cloudformation describe-stacks --stack-name orders --region $AWS_REGION | jq -r '.Stacks[0].Outputs[] | select( .OutputValue | contains("execute-api"))' | jq -r ".OutputValue"`
```

And call this API with, which should send order into queue:

```
curl -s --header "Content-Type: application/json" \
  --request POST \
  --data '{"foodName": "Pizza", "quantity":2 }' \
  $API_ENDPOINT
```

If you open now SQS service, and check your order API it will show that there is one message available. But it will remain there because we don't have any consumer who would consume messages.

![Show that one message is available in the queue](/images/sqs/creation/available-message.png)