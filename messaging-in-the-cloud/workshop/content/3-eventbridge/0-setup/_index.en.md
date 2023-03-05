+++
title = "Setup"
weight = 1
+++

In this part of the module we will introduce approval phase, invoicing and schedules for our order processing system. We are are going to add rules based on DynamoDB changes to trigger other flows.
  - When our order gets into `pending` status we will trigger flow to ask for approval
  - When order gets `cancelled` we will notify the customer
  - When order gets to `paid` status we will create invoice

![Setup event bridge](/images/eventBridge/setup.png)

First let's create separate Event Bus for these messages. Open `EventBridge` in the console > go to `Event Bus` and click on `Create event bus`, name it `Order.Updated` it will take care of our order updates.

![Setup event bridge](/images/eventBridge/create-event-bus.png)

Once we have event bus, we can start defining rules, open the rules and go to `Create rule`. At this step we will enter only the rule name, set it to the `Order.Updated.Pending` and select Event Bus `Order.Updated` and go to next where we will setup more stuff about our event.

![Setup event bridge](/images/eventBridge/create-rule-name.png)

Choose type of the event, here we will be pushing our own event to the system. So let's go and choose `Other` in the first option.

![Setup event bridge](/images/eventBridge/create-rule-type.png)

Go to section `Creation method` and choose `Custom pattern`, and in the field below for the JSON enter the following JSON

```
{
  "detail": {
    "status": [ { "prefix": "PAID" } ]
  }
}
```

This JSON will search for status which starts with `PAID` status.

Before you proceed it's important to enable `Content-based filter syntax` which will allow us to search in the content of the message.

![Status](/images/eventBridge/create-rule-pattern.png)

On the next step we will have to connect to the Lambda which can create invoice.
Choose `AWS Service` for the target type, and select a target `Lambda`.
Now you are able to select, select the `Create Invoice` lambda for target.

![EventBridge configuration for lambda ARN](/images/eventBridge/create-rule-arn.png)

Go to `Skip to Review and create`, we won't setup any tags. They you need to click `Create rule` which will setup our rule for us.
