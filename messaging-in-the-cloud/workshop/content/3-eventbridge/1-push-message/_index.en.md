+++
title = "Push message to EventBridge"
weight = 2
+++

Now that we have our event bus and rules, we need to trigger it when DynamoDB changes.
As you know, we already have our DynamoDB trigger which only push notifications to the SNS, let's open `environment/workspace/workshops/messaging-in-the-cloud/resources/code/react-to-dynamodb/index.js` and edit that code to the following:

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

    // When it's changed to PAID send to EventBridge
    if (oldImage && oldImage.orderStatus.S !== 'PAID' && newImage.orderStatus.S === 'PAID') {
        await ebClient.putEvents({
          Entries: [
            {
                Detail: JSON.stringify({
                  id: newImage.id.S,
                  status: 'PAID'
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

Because now our lambda does more work, we also need to add permission for this lambda. Open `template.yaml` and find `ReactToDynamo` section which is our Lambda. Under `Policies` > `Statement` add new policy to allow this lambda to push events to the EventBridge.

```
          - Effect: Allow
            Action:
              - events:PutEvents
            Resource:
              - "*"
```

As you replace this code in the existing function you need to build and deploy again

```
sam build --template template.yaml
sam deploy --stack-name orders
```

And now to test our connection, we can call our endpoint to update order to PAID status which will update it in Dynamo. Go to the DynamDB first and grab order id.

![Taking order id from the DynamoDB table](/images/eventBridge/order-id.png)

Run the following command but pass id that you grapped above:

```
curl -s --header "Content-Type: application/json"   --request PUT   --data '{"id": "YOUR_PRIMARY_KEY", "foodName": "Pizza", "status": "PAID" }' $API_ENDPOINT
```

In the end you should see new `invoice` created in the `invoice` table with the order_id filled.
