+++
title = "React on CloudWatch event"
weight = 5
+++

Because we are working with orders, we want to notify as our orders starts failing. This can be done if we set proper alarms to send notification through the SNS.

We will setup CloudWatch alarm on our Dead Letter Queue and send email through SNS.

Alarm gets setted up in the CloudWatch console, let's open `CloudWatch` console > Alarms and go to `Create Alarm`

![CloudWatch Alarm](/images/sns/alarms/sns-alarm.png)

We need to configure this alarm during creation process, first thing we need to get is metric which we want to follow. Go to `Select metric` and search for `SQS` because we want to get notified as number of orders starts increasing in DLQ dramaticaly.

![CloudWatch select metric for alarm](/images/sns/alarms/alarm-metric.png)

We need to select metric for our DLQ, so find metrics which are related to the `orders_deadletter.fifo` and we will watch for `ApproximateNumberOfMessagesVisible` which is indicator of how messages are in the queue at the moment.

![CloudWatch selected metric](/images/sns/alarms/alarm-selected-metric.png)

And now we need to configure our metric, what is he avg number on which we want to react?
Let's set `period to 1 minute` and set that our value must be greater then 2. It means that it will send us email that something is wrong after we have more then 2 messages in DLQ.

![CloudWatch set alarm value](/images/sns/alarms/alarm-value.png)

And now we need to setup our topic, we can reuse `orders-topic` but this one has diffeerent reasons to change and might hold different subscribers.
Let's choose `Create new topic`, set name of the topic to the `dlq_topic` and specify your email for the subscribers. After that go to the `Create topic` which will select this topic automatically.

![CloudWatch set alarm topic](/images/sns/alarms/topic-creation.png)

Now you can go to the next step and name this alarm `DLQ_AvgMessage_Alarm` and the proceed and create this alarm.

![CloudWatch set alarm name](/images/sns/alarms/alarm-name.png)

**And as in previous topic, you need to go to the email and confirm your email subscription. So go to the email and confirm SNS subscription**

In order to test this, let's push 3 messages which will fail and endup in DLQ for this reason. It should trigger CloudWatch Alarm and notify us of the failure. Execute following command 3 times in the Cloud9:

```
curl -s --header "Content-Type: application/json"   --request POST   --data '{"foodName": "Pizza" }'   $API_ENDPOINT
```

As the alarm threshold gets crossed it will trigger SNS subscription and deliver us a message.

![CloudWatch alarm notification in the email](/images/sns/alarms/alarm-notification.png)
