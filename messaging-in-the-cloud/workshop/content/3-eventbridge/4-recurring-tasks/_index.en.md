+++
title = "Recurring tasks"
weight = 4
+++

Sometimes you need your lambda to be triggered at certain times, to behave like cron job in linux. We will create our lambda to mark order status as `OVERDUE` if it's in status pending and time has passed.

Let's first create one more order which will be marked as overdue after we create recurring task.
Create order using:

```
curl -s --header "Content-Type: application/json"   --request POST   --data '{"foodName": "Pasta", "quantity": 1 }' $API_ENDPOINT
```

Before we proceed let's edit our createdAt time so that once our recurring job triggers it will mark it as OVERDUE. Change `createdAt` to be one day in the past.

![Edit dynamo order](/images/eventBridge/schedules/edit-dynamo-order.png)

Now proceed to the Event Bridge > Schedules > Create schedules.

![Create schedule](/images/eventBridge/schedules/create-schedule.png)

Let's name our schedule `check-for-overdue` and move to the next step.

![Create schedule name](/images/eventBridge/schedules/create-schedule-name.png)

We need to define our schedule pattern, so we will choose it to be:
- Occurrence will be `Recurring schedule`
- Schedule type will be `Rate-based schedule`
- We want to trigger this every minute for now in order to test it quickly
- Let's mark `Flexible time window` as `Off`

After you configure this, you can proceed to next step.

![Create schedule pattern](/images/eventBridge/schedules/create-schedule-recurring.png)

On next step we need to choose target which will be called after recurring jobs execute.
We will call Lambda so our target is `Lambda`, and for `Lambda function` choose `MarkAsOverdue` lambda which will pull DynamoDB items and check if they are overdue.

![Create schedule target](/images/eventBridge/schedules/create-schedule-target.png)
![Create schedule target](/images/eventBridge/schedules/create-schedule-lambda.png)

Go the the end and create schedule in the end. It takes some time, but after it's done it will appear in the Event Bridge.

![Create schedule finished](/images/eventBridge/schedules/create-schedule-finished.png)

Now after it gets triggered our order will be marked as OVERDUE. And you can check that in DynamoDB again.

![Record shown as overdue](/images/eventBridge/schedules/dynamo-record-overdue.png)
