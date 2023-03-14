+++
title = "Archives"
weight = 4
+++

In order to persist the events we can leverage Event Bridge archives. It will store events that we publish on our Event Bus. Go to Event Bridge > Archives and `Create Archive`

![Create archive](/images/eventBridge/archives/create-archive.png)

Let's name archive `Order.Updated.Archive`, and for source we will choose `Order.Updated` because we publish our messages to this event bus.
Archives can be stored for certain number of days, let's define that we want to store for 30 days maximum in order for them to be removed later on.

![Create archive filtering](/images/eventBridge/archives/create-archive-name.png)

On next step it allows us to filter for certain event pattern and create separate archives for different events. But here we won't do it and let's keep them all in same archive. Select `No event filtering` and go to `Create archive`

![Create archive filtering](/images/eventBridge/archives/create-archive-filtering.png)

After creating archive it will appear in your Event Bridge console like this.

![Creatd archive](/images/eventBridge/archives/create-archive-created.png)

Let's test it, open Cloud9 terminal and let's create one more order

```
curl -s --header "Content-Type: application/json" \
  --request POST \
  --data '{"foodName": "Spaghetti", "quantity":2 }' \
  $API_ENDPOINT
```

Now that it's created, grab id again from dynamodb for this particular order and let's update it to cancelled. Replace YOUR_PRIMARY_KEY with order id from your dynamo table.

```
curl -s --header "Content-Type: application/json"   --request PUT   --data '{"id": "YOUR_PRIMARY_KEY", "foodName": "Spaghetti", "status": "CANCELLED" }' $API_ENDPOINT
```

Now since message was sent and processed, it will appear in the event bridge archive.

![Created archive shows events](/images/eventBridge/archives/create-archive-display.png)

You can see that we now have 1 event in the archive and we can replay this event in order to be processed again.

![Created replay](/images/eventBridge/replays/create-replay.png)

It will open new page where we can setup our replay.
Name it `Replay.Cancelled`
For source choose `Order.Updated.Archive`
Destination is `Order.Updated`
We can choose specific rules to be replayed, let's choose only cancelled ones. Choose `Specify rules` and select `Order.Updated.Cancelled`.
For time period, choose a range of one month.

![Set replay name](/images/eventBridge/replays/create-replay-name.png)
![Create replay and define it's source](/images/eventBridge/replays/create-replay-source.png)
![Create replay and define it's source](/images/eventBridge/replays/create-replay-timeframe.png)

When you configure everything go to `Start Replay` and run it again.
You should receive email again that order has been cancelled.