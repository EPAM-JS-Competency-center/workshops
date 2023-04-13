+++
title = "Update consumer"
weight = 3
+++

Now that our message is in the queue we need to update our Consumer to consume messages from the RabbitMQ and send them further. It's all in our `add-orders` lambda function.

Open `index.js` inside folder `add-orders` and replace SQS implementation with this code:

```
const uuid = require('node-uuid');
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });

const dynamoClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

const tableName = process.env.ORDER_TABLE

exports.addOrder = async (event) => {
  const date = new Date().toISOString()
  const records = event.rmqMessagesByQueue['orders::/']

  for (const record of records) {
    try {
      const date = new Date().toISOString();
      let parsedBody = JSON.parse(Buffer.from(record.data, 'base64').toString('utf8'))

      if (!parsedBody.foodName || !parsedBody.quantity) {
        throw new Error('Message is missing foodName or quantity')
      }

      let item = {
        id: uuid.v4(),
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
    } catch (e) {
      console.error(e)
      return {
        statusCode: 500,
      }
    }
  }

  return {
    statusCode: 200,
  }
}

```

```
// Open the directory
cd ~/environment/workspace/workshops/messaging-in-the-cloud/resources/code/add-orders

// Install required library
npm install node-uuid --save
```

Let's build and deploy our code:

```
cd ../
sam build --template template.yaml
sam deploy --stack-name orders
```

We also need to give our lambda sufficient permission. Go to the `add-order` lambda > Configuration > Permissions. Click on the role under `Role name`

![Go to lambda role](/images/mq/lambda-role.png)

It will open IAM, and there you go to `Add permissions` > `Attach policies`.
  - Search for `AmazonMQReadOnlyAccess` and add it to this role.
  - Go to the same step and add `SecretsManagerReadWrite` too to this role.

![IAM add permission](/images/mq/iam-add-policy.png)
![IAM add AmazonMQReadOnlyAccess](/images/mq/iam-add-permission.png)
![IAM add SecretsManagerReadWrite](/images/mq/iam-add-permission-for-manager.png)

We also need to define our secrets in the Secrets Manager. Open `Secrets Manager` in AWS Console and go to `Store a new secret`

![Add new secret](/images/mq/add-secret.png)

It will open new window where you need to enter you secrets.
  - For the type of secret choose `Other type of secret`
  - For key value pairs you need to enter both `username` and `password`. Username is `rabbit` and `password` value is one you entered earlier

![Add new secret values](/images/mq/add-secret-values.png)

Go to next screen and enter `Secret name` which is `dev/rabbit` for us.

![Add secret name](/images/mq/add-secret-name.png)

After that just proceed to next and create secret in the end.
When secret gets created, proceed to Lambda function `add-orders`.
AWS Lambda supports Amazon MQ to be a trigger for it, go to Lambda > Click to SQS Trigger > Select it and click to `Delete`, confirm deletion after that.

![Remove SQS Trigger](/images/mq/remove-old-triggers.png)

Now let's add Amazon MQ trigger, go to `Add Trigger`.
  - Choose MQ for a source
  - For broker choose `OrderProcessing`
  - For Queue name choose `orders`
  - Under `Secrets Manager key` choose our created secret

![Add trigger source](/images/mq/add-trigger-source.png)
![Add trigger queue name and secret](/images/mq/add-trigger-queue-name-and-secret.png)

After you finish adding all stuff, go on and create a trigger.

![Created trigger](/images/mq/created-trigger.png)

In the end it will start processing our orders from RabbitMQ and they will be inserted into DynamoDB. Everything else remains the same, now we successfully replaced one component entirely.

![Record is in dynamodb](/images/mq/inserted-into-dynamo.png)
