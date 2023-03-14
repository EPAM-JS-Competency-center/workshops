+++
title = "Polling"
weight = 2
+++

Ok, now we have one part of the order processing but it still doesn't function properly.
In this system we are pushing data to SQS but nothing consumes it, so our message our stuck for now.

![Missing connection with the queue for the long polling](/images/sqs/polling/polling-setup.png)

Before we start connecting it, our Lambda doesn't have permission to read from SQS. Because when we deployed it, SQS didn't exists, so we need to specify policy and allow `AddOrders` function to read from SQS.

Open `IAM` in AWS Console, and search for `AddOrderRole` and open that role. Go to `Add permissions` > `Attach policies`

![Lambda permission](/images/sqs/polling/lambda-permission.png)

And attach `AWSLambdaSQSQueueExecutionRole` to this IAM Role. In the end you will have something like this in your role.

![Lambda permission attached](/images/sqs/polling/lambda-permission-attached.png)

If you take a look at `AWSLambdaSQSQueueExecutionRole` role it has a little bit more permission than what we actually need. Best practice would be to give it just `ReceieveMessage` since that's all we need to consume SQS but it's ok for the workshop.

```
# Actions allowed by AWSLambdaSQSQueueExecutionRole
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "sqs:ReceiveMessage",
                "sqs:DeleteMessage",
                "sqs:GetQueueAttributes",
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
```

There are two types of polling in SQS:
  - **Long polling** - Has lower cost since you send one request and it can wait for maximum of 20 seconds before it returns results. It can reduce the number of empty responses since it waits longer, and it will query all SQS servers
  - **Short polling** - Will query only the subset of SQS servers, so sometimes it can return false response when messages exists in the queue.

In this example we don't have any critical component where we have to implement short polling, so we will connect our lambda with Long Polling. This is done through Lambda Triggers, go the the `AddOrders` lambda in the Lambda service.

![Trigger button on the lambda page](/images/sqs/polling/trigger-button.png)

Now on that page we need to configure a few things:

  - For the source pick `SQS`
  - For the SQS queue pick `orders.fifo` queue
  - We can leave everything as it, it allows us to configure:
      - BatchSize - how many items we should be polling

![SQS setup](/images/sqs/polling/sqs-setup.png)

When you click `Add` it will add our lambda as a trigger to the SQS, which will consume our messages and insert data into DynamoDB. With that our message should be consumed, if you go to the `DynamoDB` service and open `orders` document, you should se one that we sent.

![New document after inserting item](/images/sqs/polling/dynamodb-table-after-insert.png)
