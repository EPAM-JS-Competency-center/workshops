+++
title = "Cleanup"
weight = 6
+++

Now we can cleanup our environment.

1. Go to Amazon MQ and remove OrderProcessing
2. Go to EventBridge and remove all the rules first
3. Remove event bus after you remove rules
4. Remove SNS Topics
5. Remove SQS queues
6. Go to IAM, find AddOrderRole and remove all 3 permission we introduced
7. Run command to remove all remaining parts of the stack

```
sam delete --stack-name order
```

8. Remove Cloud9 instance