+++
title = "React on DynamoDB"
weight = 4
+++

Now that we have SNS topic configured, we need to connect it with DynamoDB. Go to the `orders` table and configure enable DynamoDB Streams for it.

![Choose name](/images/sns/react-on-changes/dynamodb-stream.png)

We will enable stream for both new and old images. So choose last option `New and old images`

![Choose name](/images/sns/react-on-changes/dynamodb-stream-creation.png)

Once it's created we need to configure trigger for our DB Stream. Our trigger will be Lambda function which was bootstrapped initially, it's called `reactToDynamo`.

![Choose name](/images/sns/react-on-changes/dynamodb-stream-trigger.png)

Our Lambda requires to recieve `TOPIC` as environment variable, and that variable will be SNS ARN. We need to take it from SNS topic, go to SNS console and copy ARN from the topic.

![SNS ARN](/images/sns/react-on-changes/sns-arn.png)

Now we need to add this environment variable to `reactToDynamo` lambda. Go to Lambda console and open `reactToDynamo` lambda > Configuration > Environment variables

![SNS ARN](/images/sns/react-on-changes/send-to-sns-env.png)

And now we have everything connected to our SNS topic, we only need to push new order into the system in order to test it. Let's push new order and see if email is received when order is created.

```
curl -s --header "Content-Type: application/json"   --request POST   --data '{"foodName": "Pizza", "quantity":2 }'   $API_ENDPOINT
```

![SNS Message](/images/sns/react-on-changes/receieved-message.png)