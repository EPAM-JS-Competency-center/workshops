+++
title = "Rest of rules"
weight = 3
+++

Let's create one more rule, it's going to be rule for cancelled orders. Go to Event Bridge and add new rule.
Name it `Order.Updated.Cancelled` and choose Event Bus to be `Order.Updated`.

![Setup event bridge](/images/eventBridge/create-second-rule-name.png)

Choose type of the event, here we will be pushing our own event to the system. So let's go and choose `Other` in the first option.

![Setup event bridge](/images/eventBridge/create-rule-type.png)

Go to section `Creation method` and choose `Custom pattern`, and in the field below for the JSON enter the following JSON

```
{
  "detail": {
    "status": [ { "prefix": "CANCELLED" } ]
  }
}
```

This JSON will search for status which starts with `CANCELLED` status.

Before you proceed it's important to enable `Content-based filter syntax` which will allow us to search in the content of the message.

![Status](/images/eventBridge/create-second-rule-pattern.png)

On the next step we will have to connect to the SNS.
Choose `AWS Service` for the target type, and select a target `SNS Topic`.
Now you are able to select, select the `order-topic` topic for target.

![Status](/images/eventBridge/create-second-rule-target.png)

That's all, go on and create the rule. We need to update our lambda which sends data to the Event Bridge to new code and configure to send it for multiple statuses. Open `react-to-dynamodb/index.js` and add following code:

```
const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.REGION });
const sns = new AWS.SNS();
const ebClient = new AWS.EventBridge({ apiVersion: '2015-10-07' });

exports.reactToDynamo = async (event) => {
    const newImage = event.Records[0].dynamodb.NewImage;
    const oldImage = event.Records[0].dynamodb.OldImage;

    // When it's created send to SNS
    if (!oldImage && newImage.orderStatus.S === 'PENDING') {
        await sns.publish({
            "Message": JSON.stringify(newImage),
            "TopicArn": process.env.TOPIC
        }).promise();
    }

    if (oldImage && newImage && oldImage.orderStatus.S !== newImage.orderStatus.S) {
        await ebClient.putEvents({
          Entries: [
            {
                Detail: JSON.stringify({
                  id: newImage.id.S,
                  status: newImage.orderStatus.S
                }),
                EventBusName: "Order.Updated",
                DetailType: "Order changed",
                Source: 'dynamo.changes',
                Time: new Date()
            },
          ],
        }).promise();
    }
};
```

Now we need to build and deploy our code using:

```
sam build --template template.yaml
sam deploy --stack-name orders
```

To test our connection, we can call our endpoint to update order to CANCELLED status which will update it in Dynamo. Go to the DynamDB first and grab order id.

![Taking order id from the DynamoDB table](/images/eventBridge/order-id.png)

Run the following command but pass id that you grapped above:

```
curl -s --header "Content-Type: application/json"   --request PUT   --data '{"id": "YOUR_PRIMARY_KEY", "foodName": "Pizza", "status": "CANCELLED" }' $API_ENDPOINT
```

In the end you should receive email when order is cancelled.
